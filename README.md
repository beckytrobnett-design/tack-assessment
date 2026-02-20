# TACK Assessment

A financial wellness orientation assessment by Tondreau Point. A 24-question assessment that identifies users' financial orientation, captures their email, displays detailed results, and sends a PDF report via email.

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router
- Zustand / React Context
- Resend (email)
- Supabase (data storage, server-side only)
- @react-pdf/renderer (PDF generation)

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

For full local testing including the email/PDF API, use Vercel's dev server:

```bash
npx vercel dev
```

## Environment Variables

Create `.env.local` for local dev. For production (Vercel), set these in **Settings > Environment Variables**:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (**never expose to frontend**)
- `RESEND_API_KEY` - Your Resend API key (get one at resend.com)
- `RESEND_FROM_EMAIL` - e.g. `"Penny at TACK <penny@yourdomain.com>"` (use `onboarding@resend.dev` for testing)
- `RESEND_ADMIN_EMAIL` - Your email to receive a record of each completed assessment
- `TACK_APP_URL` - App URL for links in emails (default: https://tack.tondreaupoint.com)

## Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the migration in **SQL Editor > New Query**:
   - Copy contents of `supabase/migrations/001_create_assessment_responses.sql`
   - Paste and run
3. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` (and Vercel)

## Build & Deploy

```bash
npm run build
```

Deploy to Vercel or Netlify. The `/api/send-report` endpoint is a serverless function (Vercel: `api/send-report.js`).

### Custom domain (e.g. tack.tondreaupoint.com)

See [CUSTOM_DOMAIN.md](./CUSTOM_DOMAIN.md) for step-by-step instructions.

## Routes

- `/` - Welcome
- `/assessment` - 24-question assessment
- `/results/email` - Email capture (after assessment)
- `/results` - Full results display
