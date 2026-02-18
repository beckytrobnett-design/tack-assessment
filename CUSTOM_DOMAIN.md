# Using Your Own Domain (tondreaupoint.com)

To use a URL like `tack.tondreaupoint.com` instead of `tack-assessment.vercel.app`:

## Step 1: Add domain in Vercel

1. Open your project on [vercel.com](https://vercel.com)
2. Go to **Settings** → **Domains**
3. Enter `tack.tondreaupoint.com` (or `assessment.tondreaupoint.com`)
4. Click **Add**
5. Vercel will show you the DNS records to add

## Step 2: Add DNS record in Squarespace

1. Go to [Squarespace](https://squarespace.com) → your site → **Settings** → **Domains**
2. Click your domain (tondreaupoint.com)
3. Go to **DNS Settings** (or **Advanced Settings**)
4. Add a **CNAME** record:
   - **Host:** `tack` (for tack.tondreaupoint.com)
   - **Points to:** `cname.vercel-dns.com`
5. Save

## Step 3: Wait for verification

Vercel will verify the domain (usually within a few minutes, sometimes up to 48 hours). Once verified, your app will be live at `https://tack.tondreaupoint.com`.
