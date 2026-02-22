import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Lazily initialised so build-time evaluation doesn't fail without RESEND_API_KEY
function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

// In-memory sliding-window rate limiter (resets on cold start — sufficient for MVP)
const submissionMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxPerWindow = 5;

  const history = submissionMap.get(ip) ?? [];
  const recent = history.filter((t) => now - t < windowMs);

  if (recent.length >= maxPerWindow) return true;

  submissionMap.set(ip, [...recent, now]);
  return false;
}

export async function POST(request: NextRequest) {
  // IP extraction for rate limiting
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() ?? request.headers.get('x-real-ip') ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, phone, clientType, message, consent, website } = body as {
    name: string;
    email: string;
    phone?: string;
    clientType: string;
    message: string;
    consent: boolean;
    website?: string;
  };

  // Honeypot — return 200 silently to avoid tipping off bots
  if (website) {
    return NextResponse.json({ success: true });
  }

  // Server-side validation
  if (!name || !email || !clientType || !message || !consent) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email))) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const resend = getResend();
  const firmEmail = process.env.FIRM_EMAIL ?? 'contact@argaccountax.ca';
  const timestamp = new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' });

  try {
    // 1. Notify the firm
    await resend.emails.send({
      from: 'ARG Accountax Website <noreply@argaccountax.ca>',
      to: [firmEmail],
      subject: `New Contact Form — ${clientType} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #15803d;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; color: #64748b;">Name</td><td style="padding: 8px;">${name}</td></tr>
            <tr style="background:#f8fafc"><td style="padding: 8px; font-weight: bold; color: #64748b;">Email</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #64748b;">Phone</td><td style="padding: 8px;">${phone || 'Not provided'}</td></tr>
            <tr style="background:#f8fafc"><td style="padding: 8px; font-weight: bold; color: #64748b;">Client Type</td><td style="padding: 8px;">${clientType}</td></tr>
          </table>
          <h3 style="color: #334155; margin-top: 24px;">Message</h3>
          <div style="background: #f8fafc; border-left: 4px solid #15803d; padding: 16px; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="font-size: 12px; color: #94a3b8;">Submitted at ${timestamp} EST</p>
        </div>
      `,
    });

    // 2. Auto-reply to the submitter
    await resend.emails.send({
      from: 'ARG Accountax <noreply@argaccountax.ca>',
      to: [String(email)],
      subject: `We received your message — ARG Accountax`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #15803d; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">ARG Accountax</h1>
            <p style="color: #dcfce7; margin: 8px 0 0; font-size: 14px;">Ontario Tax Specialists</p>
          </div>
          <div style="background: white; padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #0f172a;">Thank you, ${name}!</h2>
            <p style="color: #475569;">We have received your message and will get back to you within <strong>one business day</strong>.</p>
            <p style="color: #475569;">In the meantime, feel free to use our free tax tools:</p>
            <a href="https://argaccountax.ca/en/calculators" style="display: inline-block; background: #15803d; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 8px;">
              Try the Tax Calculator
            </a>
            <hr style="margin: 32px 0; border: none; border-top: 1px solid #e2e8f0;" />
            <p style="font-size: 12px; color: #94a3b8;">ARG Accountax · Ontario Tax Specialists · contact@argaccountax.ca</p>
            <p style="font-size: 11px; color: #cbd5e1; margin-top: 8px;">This is an automated confirmation. This message does not constitute professional tax advice.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Contact API] Resend error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
