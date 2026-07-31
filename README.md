# Tradd & Chloe

Save-the-date site for June 4–7, 2027, Acadia National Park.

Static HTML/CSS/JS (`index.html`, `styles.css`, `script.js`) served as static assets by a Cloudflare Worker (`worker/index.js`, configured in `wrangler.toml`). The Worker also handles `POST /api/subscribe` and emails a notification via [Resend](https://resend.com) when someone submits the "Keep me posted" form; every other request falls through to the static assets.

## Deploying on Cloudflare Workers

This project already exists as a Worker connected to this GitHub repo (`traddandchloe.com`). Cloudflare's Git integration auto-detects `wrangler.toml` and deploys on every push to `main` — no separate build step needed.

To configure or update it:

1. Cloudflare dashboard → **Workers & Pages → (this project) → Settings → Variables and Secrets**, and add:
   - `RESEND_API_KEY` (as a **secret**, not a plain variable) — from your Resend dashboard, **Settings → API Keys**.
   - `NOTIFY_EMAIL` — the address that should receive signup notifications. Until a custom sending domain is verified in Resend, this must match the email your Resend account itself is registered under (sandbox sending restriction). Defaults to `gvwkgyh994@privaterelay.appleid.com` if unset.
   - `NOTIFY_FROM` (optional) — sender shown on the notification email. Defaults to Resend's sandbox address `onboarding@resend.dev`.
2. Redeploy (or push a commit) so the Worker picks up the new variables.

## Local development

```bash
npx wrangler dev --persist-to /tmp/wrangler-state
```

Runs the static site and the `/api/subscribe` route together, by default at `http://localhost:8787`. The `--persist-to` pointing outside the project folder avoids an infinite reload loop that happens if Wrangler's local state directory (`.wrangler/`) is watched as part of the assets folder. Pass `--var RESEND_API_KEY:...` (and `NOTIFY_EMAIL`) to test the real email path locally.
