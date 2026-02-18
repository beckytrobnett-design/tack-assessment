# TACK Assessment

A financial wellness orientation assessment by Tondreau Point. A 24-question assessment that identifies users' financial orientation, captures their email, displays detailed results, and sends a PDF report via email.

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router
- Zustand / React Context
- Resend (email)
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

## Environment Variables (for email)

Create `.env.local` for local dev. For production (Vercel), set these in the Vercel dashboard:

- `RESEND_API_KEY` - Your Resend API key (get one at resend.com)
- `RESEND_FROM_EMAIL` - e.g. `"Penny at TACK <penny@yourdomain.com>"` (use `onboarding@resend.dev` for testing)
- `RESEND_ADMIN_EMAIL` - Your email to receive a record of each completed assessment (email, orientation results, timestamp)

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
