# Business Requirements Document (BRD)

## Ontario Personal & Corporate Tax Website

**Last Updated:** February 2026
**Languages:** English (primary), Tamil (தமிழ்)
**Tech Stack:** Next.js (App Router) · Tailwind CSS · next-intl · Vercel

---

## 1. Business Overview

### 1.1 Purpose

Build a modern, client-friendly tax website that educates clients, reduces repetitive questions, improves lead conversion, streamlines pre-engagement preparation, and positions the firm as credible, professional, and Ontario-focused.

### 1.2 Target Users

- Personal tax clients (employees, families, seniors)
- Self-employed individuals
- Small business owners / CCPCs
- Prospective clients researching tax services

### 1.3 Key Success Metrics

- Increased contact form submissions
- Reduced basic tax inquiry emails
- Increased preparedness of clients before engagement
- Higher conversion from website → client

---

## 2. Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js (App Router) | Full-stack React framework |
| Styling | Tailwind CSS | Mobile-first, utility classes |
| Bilingual (EN/Tamil) | next-intl | `/en` and `/ta` routes, JSON translation files |
| Fonts | Noto Sans + Noto Sans Tamil | Google Fonts, free |
| Contact Form Email | Resend (or Nodemailer) | Via Next.js API route |
| Blog/Content | MDX files in repo | Zero cost, version controlled |
| Hosting | Vercel | Free tier, Canadian edge, auto SSL |
| Spam Protection | Honeypot + rate limiting | No CAPTCHA dependency |

---

## 3. Tax Calculators (Client-Facing)

### 3.1 Business Goals

- Provide instant value
- Educate clients without replacing professional advice
- Encourage engagement and lead capture

### 3.2 Global Calculator Requirements

**Functional:**
- Interactive, real-time calculations (client-side)
- Federal + Ontario logic
- Clear result summaries
- Optional PDF export
- Optional "email results to me"
- Clear disclaimer: *Estimates only – not tax advice*

**Non-Functional:**
- Mobile-first responsive design
- Plain-language labels (in both EN and Tamil)
- Fast load (<2s)
- No login required

**Security:**
- No SIN or CRA credentials collected
- Inputs not stored unless user opts in

### 3.3 Personal Tax Calculators

**Federal + Ontario Income Tax Calculator**

Inputs: Employment income, Self-employment income, Investment income, RRSP contributions, Deductions and credits (basic defaults applied)

Outputs: Total estimated tax, Federal vs Ontario breakdown, Average & marginal tax rate

**RRSP Contribution Room Estimator** — Estimates remaining contribution room, warns of over-contribution risk

**TFSA Contribution Tracker** — Estimates available TFSA room, flags potential penalties

**CPP / EI Premium Calculator** — Calculates employee & self-employed CPP/EI, educational employer/employee split

**Refund vs Amount Owing Estimator** — Simple "refund vs owe" output, visual indicator (green/red)

### 3.4 Corporate Tax Calculators

**Small Business Tax Estimator (CCPC)** — Federal + Ontario small business rates, effective tax rate displayed

**Net Income → Taxable Income Calculator** — Add-backs and deductions supported

**Capital Cost Allowance (CCA) Calculator** — CRA asset classes, half-year rule applied

**GST/HST ITC Estimator** — Ontario HST (13%), net payable or refund

---

## 4. Filing & Deadline Tools

### 4.1 Business Goals

- Reduce missed deadlines
- Increase repeat visits
- Position firm as proactive

### 4.2 Interactive Tax Calendar

Federal + Ontario deadlines for T1, T2, HST, Payroll, and Instalments. Filters by client type. Month and list views.

### 4.3 Deadline Reminder System

- Email reminders (SMS optional later)
- Users select: Personal, Corporate, HST
- Reminder timing: 30 days, 7 days, 1 day prior

**Admin:** Update deadlines yearly, enable/disable reminders, view subscriber list (email only)

### 4.4 Deadline Alert Widget

- Lightweight email capture
- Confirmation message
- Optional CTA: "Book a consultation"

---

## 5. Forms & Resource Library (Links Only)

### 5.1 Business Goals

- Central discovery hub
- Reduce "which form do I need?" questions
- Always point to the latest official version

### 5.2 Content Types

**CRA Forms & Publications** — Link to CRA master forms page, link to tax packages by year/province (Ontario)

**Ontario Tax Resources** — Links to Ontario-specific credits (ON428, ON479 info pages)

**Guides** — RRSP, TFSA, Payroll, GST/HST

### 5.3 Features

- Categorization (Personal / Business / Corporate)
- Search and filters
- "Opens on official government site" notice
- Last-reviewed date shown

### 5.4 Hosted Templates

| Template | Purpose | Format |
|----------|---------|--------|
| Personal Tax Checklist | Gather slips & deductions | PDF, Excel |
| Self-Employed Income & Expense Summary | T2125 prep | PDF, Excel |
| Corporate Year-End Tax Organizer | T2 prep | PDF, Excel |
| GST/HST ITC Checklist | Track eligible ITCs | PDF, Excel |
| Payroll Remittance Checklist | CPP/EI/Tax tracking | PDF, Excel |

---

## 6. Tax Planning & Education Content

### 6.1 Business Goals

- Build trust and authority
- Improve SEO (bilingual content doubles organic reach)
- Reduce meeting time spent on basics

### 6.2 Blog / Article Section

Categories: Personal, Corporate, Ontario-specific. Tags and search. Estimated reading time. All articles available in EN and Tamil.

### 6.3 Tax Tip of the Month

Highlighted homepage card, monthly rotation, optional email reuse.

### 6.4 Video / Explainer Library

Short (2–5 min) videos, embedded player, beginner-friendly topics.

### 6.5 Ontario-Specific FAQs

Required topics: Ontario Small Business Deduction, Ontario Trillium Benefit, Ontario surtax, HST in Ontario.

Features: Expand/collapse, plain language, links to calculators/resources. Available in EN and Tamil.

---

## 7. Landing Page + Contact Form

### 7.1 Page Sections

1. **Hero Section** — Clear value proposition, Ontario-specific messaging, CTA button ("Get Started")
2. **Services Overview** — Personal Tax, Self-Employed, Corporate / Small Business
3. **Why Choose Us** — Experience, Ontario focus, Proactive approach
4. **Tools Preview** — Calculators, Deadline reminders, Resources
5. **Call to Action** — Contact form, Phone/email optional

### 7.2 Contact Form Fields

- Full name (required)
- Email (required)
- Phone (optional)
- Client type: Personal / Business / Corporate (required)
- Message (required)
- Consent checkbox (privacy)

### 7.3 Submission Behavior

- Sends email to firm inbox via Resend API route
- Auto-reply confirmation to user
- No database storage (Phase 1)

### 7.4 Security

- Honeypot field for spam protection
- Rate limiting on API route
- SSL (auto via Vercel)
- Privacy notice displayed

---

## 8. Bilingual Support (English / Tamil)

### 8.1 Implementation

- **Routing:** `/en/*` and `/ta/*` via next-intl
- **Translation files:** JSON per language in `/messages/en.json` and `/messages/ta.json`
- **Language toggle:** Persistent header component, stores preference
- **Fonts:** Noto Sans (English) + Noto Sans Tamil (Tamil) via Google Fonts
- **Default language:** English
- **SEO:** Separate URLs per language, hreflang tags

### 8.2 Translation Scope

All UI labels, calculator fields, form labels, disclaimers, navigation, error messages, and static content pages must be translated. Blog posts may be published in one or both languages.

### 8.3 Translation Responsibility

Client to provide or approve Tamil translations. Developer to implement translation file structure.

---

## 9. Non-Functional Requirements

- Mobile-first responsive design
- Fast page loads (<2s)
- SEO optimized (metadata, sitemap, hreflang)
- Accessible (WCAG AA)
- Clear disclaimers on all calculator pages
- Hosted on Vercel (Canadian edge nodes)

---

## 10. Out of Scope (Phase 2+)

- Client login accounts
- CRA "Represent a Client" integration
- E-signatures
- AI tax assistant
- Saved calculator profiles
- SMS reminders
- Database / Supabase backend

---

## 11. Recommended MVP Build Order

1. **Landing page + contact form** (with EN/Tamil toggle)
2. **Tax calculators** (personal first)
3. **Deadline calendar + reminders**
4. **Forms & resources** (links + templates)
5. **Education content** (blog, FAQs, videos)

---

## 12. Project Structure (Reference)

```
ontario-tax-site/
├── app/
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx              # Landing page
│       ├── calculators/
│       │   └── page.tsx
│       ├── deadlines/
│       │   └── page.tsx
│       ├── resources/
│       │   └── page.tsx
│       ├── blog/
│       │   └── page.tsx
│       └── contact/
│           └── page.tsx
├── components/
│   ├── LanguageToggle.tsx
│   ├── ContactForm.tsx
│   ├── TaxCalculator.tsx
│   └── ...
├── messages/
│   ├── en.json
│   └── ta.json
├── content/
│   └── blog/                    # MDX blog posts
├── public/
│   └── templates/               # Downloadable PDFs/Excel
├── tailwind.config.ts
├── next.config.ts
└── package.json
```
