import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
import time
from collections import defaultdict

# IP Rate Limiting Map
# Format: { 'ip_address': [timestamp1, timestamp2, ...] }
rate_limit_data = defaultdict(list)
MAX_REQUESTS_PER_HOUR = 10

def check_rate_limit(ip_address):
    current_time = time.time()
    one_hour_ago = current_time - 3600
    
    # Clean up old timestamps
    rate_limit_data[ip_address] = [ts for ts in rate_limit_data[ip_address] if ts > one_hour_ago]
    
    if len(rate_limit_data[ip_address]) >= MAX_REQUESTS_PER_HOUR:
        return False
        
    rate_limit_data[ip_address].append(current_time)
    return True

# SMTP Configuration
SMTP_SERVER = "giowm1089.siteground.biz"
SMTP_PORT = 587
SMTP_USERNAME = "hello@agenticinsights.io"
SMTP_PASSWORD = "21*3t1rbes|B"
RECIPIENT_EMAIL = "hello@agenticinsights.io"

class ContactFormHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/contact':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                # 1. Rate Limiting Check
                client_ip = self.client_address[0]
                if not check_rate_limit(client_ip):
                    self.send_response(429)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': 'Rate limit exceeded. Please try again later.'}).encode('utf-8'))
                    return

                data = json.loads(post_data.decode('utf-8'))
                
                # 2. Honeypot Check
                honeypot = data.get('honeypot', '')
                if honeypot:
                    # Bot detected (humans won't see or fill this field)
                    # We return 200 to fool the bot, but we don't send the email
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({'status': 'success'}).encode('utf-8'))
                    return

                # Extract form fields
                name = data.get('name', '')
                email = data.get('email', '')
                company = data.get('company', '')
                topic = data.get('topic', '')
                message = data.get('message', '')
                
                # Send notification email to Agentic Insights
                self.send_email(name, email, company, topic, message)
                
                # Send confirmation email to the user
                self.send_confirmation_email(name, email, topic)
                
                # Send success response
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'success'}).encode('utf-8'))
                
            except Exception as e:
                print(f"Error: {e}")
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

    def send_email(self, name, email, company, topic, message):
        msg = MIMEMultipart()
        msg['From'] = SMTP_USERNAME
        msg['To'] = RECIPIENT_EMAIL
        msg['Subject'] = f"New Contact Form Submission: {topic}"

        body = f"""
        New message from Agentic Insights Website:
        
        Name: {name}
        Email: {email}
        Company: {company}
        Topic: {topic}
        
        Message:
        {message}
        """
        
        msg.attach(MIMEText(body, 'plain'))

        # Use Port 587 with STARTTLS for SiteGround compatibility
        try:
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
            server.quit()
        except Exception as e:
            print(f"Failed to send notification email: {e}")
            raise e

    def send_confirmation_email(self, name, email, topic):
        msg = MIMEMultipart()
        msg['From'] = f"Agentic Insights <{SMTP_USERNAME}>"
        msg['To'] = email
        msg['Subject'] = "We've received your message — Agentic Insights"

        body = f"""
Hi {name},

Thank you for reaching out to Agentic Insights regarding "{topic}".

We've received your message and one of our experts will review it. You can expect to hear back from us within one business day.

In the meantime, feel free to explore our framework and engagement model on our website.

Best regards,

The Agentic Insights Team
https://agenticinsights.io
        """

        msg.attach(MIMEText(body, 'plain'))

        try:
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
            server.quit()
        except Exception as e:
            print(f"Failed to send confirmation email: {e}")

def run(server_class=HTTPServer, handler_class=ContactFormHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
