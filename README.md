# Tradd & Chloe

Save-the-date site for June 4–6, 2027, Acadia National Park.

Static HTML/CSS/JS (`index.html`, `styles.css`, `script.js`) plus a Cloudflare Pages Function (`functions/api/subscribe.js`) that emails a notification via [Resend](https://resend.com) when someone submits the "Keep me posted" form.

## Deploying on Cloudflare Pages

1. Go to the Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**, and pick this repo.
2. Build settings: no build command needed, output directory is the repo root (`/`).
3. After the first deploy, go to the project's **Settings → Environment variables** and add:
   - `RESEND_API_KEY` — from your Resend dashboard, **Settings → API Keys**.
   - `NOTIFY_EMAIL` — the address that should receive signup notifications. Until a custom sending domain is verified in Resend, this must match the email your Resend account itself is registered under (sandbox sending restriction). Defaults to `gvwkgyh994@privaterelay.appleid.com` if unset.
   - `NOTIFY_FROM` (optional) — sender shown on the notification email. Defaults to Resend's sandbox address `onboarding@resend.dev`.
4. Redeploy (or trigger a new deploy by pushing a commit) so the Function picks up the new environment variables.

## Local development

```bash
npx wrangler pages dev .
```

Runs the static site and the `/api/subscribe` function together at `http://localhost:8788`. Pass `--binding RESEND_API_KEY=...` (and `NOTIFY_EMAIL`) to test the real email path locally.
