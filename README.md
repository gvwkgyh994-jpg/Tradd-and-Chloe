# Tradd & Chloe

Save-the-date site for June 4–7, 2027, Acadia National Park.

Static HTML/CSS/JS (`index.html`, `styles.css`, `script.js`), served as static assets by a Cloudflare Worker (`worker/index.js`, configured in `wrangler.toml`) at `traddandchloe.com`. The "Keep me posted" form submits directly from the browser to [Formspree](https://formspree.io) (`https://formspree.io/f/mwvgdlwq`, configured in `script.js`), which emails the submission — no backend code needed for that part.

## Deploying

This project already exists as a Worker connected to this GitHub repo. Cloudflare's Git integration auto-detects `wrangler.toml` and deploys on every push to `main` — no separate build step, and no environment variables/secrets are required anymore (the Worker is asset-serving only).

To manage the signup form's destination or notification settings, use the Formspree dashboard directly (Settings on the `mwvgdlwq` form) — not this repo.

## Local development

```bash
python3 -m http.server 8123
```

Formspree is called directly from the browser, so a plain static file server is enough — no need for `wrangler dev` unless testing Worker-specific behavior (e.g. asset routing).
