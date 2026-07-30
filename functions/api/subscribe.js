const EMAIL_PATTERN = /.+@.+\..+/;
const DEFAULT_NOTIFY_EMAIL = "gvwkgyh994@privaterelay.appleid.com";
const DEFAULT_FROM = "Wedding Site <onboarding@resend.dev>";

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "That email looks incomplete — mind checking it?" }, 400);
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_PATTERN.test(email)) {
    return jsonResponse({ error: "That email looks incomplete — mind checking it?" }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return jsonResponse({ error: "Signups aren't configured yet. Please try again later." }, 500);
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.NOTIFY_FROM || DEFAULT_FROM,
      to: env.NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL,
      subject: "New save-the-date signup",
      text: `${email} just signed up for updates on the wedding site.`,
    }),
  });

  if (!resendResponse.ok) {
    return jsonResponse({ error: "Something went wrong sending your signup. Please try again." }, 502);
  }

  return jsonResponse({ ok: true }, 200);
}

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
