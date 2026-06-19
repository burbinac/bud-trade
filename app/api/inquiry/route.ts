import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { SLABS } from '@/lib/slabs';
import { signCatalogToken, CATALOG_FILE } from '@/lib/catalog-token';
import { postTradeEvent } from '@/lib/dashboard-ingest';
import { randomUUID } from 'node:crypto';

type Body = {
  firstName?: string;
  lastName?: string;
  firm?: string;
  email?: string;
  slab?: string;
  context?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CATALOG_LABEL = 'Full catalog (all nine slabs)';
const SITE_URL = 'https://trade.bernardourbina.com';

/** Warm, per-table auto-reply sent to the person who inquired. */
function buildCustomerEmail({
  firstName,
  slabName,
  essence,
  catalogUrl,
}: {
  firstName: string;
  slabName: string | null;
  essence: string | null;
  catalogUrl: string;
}): { subject: string; html: string; text: string } {
  const subject = slabName
    ? `${slabName} — your trade inquiry`
    : 'Bernardo Urbina Design — your trade inquiry';

  const opening = slabName
    ? `Thank you for your interest in ${slabName}.${essence ? ` ${essence}` : ''}`
    : 'Thank you for requesting the Trade Collection.';

  const greeting = firstName ? `Dear ${firstName},` : 'Hello,';

  const steps = [
    'We match you to available inventory and send the full spec sheet — actual photography of the slab being considered, base options, and design details — for your sign-off before any commission begins.',
    'A 50% deposit secures the slab.',
    'The piece enters the 13–15 week production schedule, finished in the United States and delivered white-glove to site.',
  ];

  const text = [
    greeting,
    '',
    opening,
    '',
    'The full Trade Collection — all nine one-of-a-kind tables, with dimensions, character, and pricing — is ready for you now:',
    catalogUrl,
    '',
    'When a piece speaks to you, reply with your project — the room, your timeline, and the table you’re drawn to — and Bernardo will match you to available inventory.',
    '',
    'What happens next:',
    ...steps.map((s, i) => `${i + 1}. ${s}`),
    '',
    'Bernardo reviews every trade inquiry personally.',
    '',
    'Warm regards,',
    'Bernardo Urbina Design',
    'trade@bernardourbina.com · trade.bernardourbina.com',
  ].join('\n');

  const ink = '#1A1815';
  const gold = '#B8924A';
  const cream = '#FAF8F3';
  const dim = '#6B6453';
  const serif = "Georgia, 'Times New Roman', serif";

  const stepsHtml = steps
    .map(
      (s, i) => `
      <tr>
        <td style="vertical-align:top;padding:0 12px 14px 0;width:22px;font-family:${serif};font-size:16px;color:${gold};line-height:1.5;">${i + 1}</td>
        <td style="vertical-align:top;padding:0 0 14px 0;font-size:14px;color:${ink};line-height:1.7;">${s}</td>
      </tr>`,
    )
    .join('');

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:${cream};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${cream};">
      <tr>
        <td align="center" style="padding:40px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border:1px solid #ECE6DA;">
            <tr>
              <td style="padding:32px 36px 0 36px;">
                <div style="font-family:${serif};font-size:13px;letter-spacing:0.22em;text-transform:uppercase;color:${ink};">Bernardo Urbina Design</div>
                <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:${gold};margin-top:4px;">Trade Collection — 2026</div>
                <div style="height:1px;width:48px;background:${gold};margin:24px 0;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px;">
                <p style="margin:0 0 18px 0;font-size:15px;color:${ink};line-height:1.7;">${greeting}</p>
                <p style="margin:0 0 18px 0;font-size:15px;color:${ink};line-height:1.7;">${opening}</p>
                <p style="margin:0 0 22px 0;font-size:15px;color:${ink};line-height:1.7;">The full Trade Collection — all nine one-of-a-kind tables, with dimensions, character, and pricing — is ready for you now.</p>
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 26px 0;"><tr><td style="background:${gold};border-radius:999px;"><a href="${catalogUrl}" style="display:inline-block;padding:14px 32px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#1A1815;text-decoration:none;border-radius:999px;">View the Trade Collection</a></td></tr></table>
                <p style="margin:0 0 28px 0;font-size:15px;color:${ink};line-height:1.7;">When a piece speaks to you, reply with your project — the room, your timeline, and the table you’re drawn to — and Bernardo will match you to available inventory.</p>
                <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${gold};margin-bottom:14px;">What happens next</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${stepsHtml}</table>
                <p style="margin:14px 0 28px 0;font-size:14px;color:${dim};line-height:1.7;font-style:italic;font-family:${serif};">Bernardo reviews every trade inquiry personally.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px 36px 36px;border-top:1px solid #ECE6DA;padding-top:24px;">
                <div style="font-family:${serif};font-size:16px;color:${ink};">Bernardo Urbina Design</div>
                <div style="font-size:12px;color:${dim};margin-top:6px;line-height:1.8;">
                  <a href="mailto:trade@bernardourbina.com" style="color:${gold};text-decoration:none;">trade@bernardourbina.com</a><br/>
                  <a href="https://trade.bernardourbina.com" style="color:${gold};text-decoration:none;">trade.bernardourbina.com</a>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html, text };
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Name is optional in the form (only Work Email + Firm are required), so it
  // must be optional here too — otherwise normal submits get a silent 400.
  const firstName = body.firstName?.trim() || '';
  const lastName = body.lastName?.trim() || '';
  const firm = body.firm?.trim();
  const email = body.email?.trim();
  const rawSlab = body.slab?.trim() || '';
  const matched = rawSlab ? SLABS.find((s) => s.name === rawSlab) ?? null : null;
  const slab = rawSlab || CATALOG_LABEL;
  const context = body.context?.trim() || '';
  const fullName = [firstName, lastName].filter(Boolean).join(' ');

  if (!firm || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.TRADE_INBOX;
  const sender = process.env.TRADE_SENDER ?? 'BUD Trade <onboarding@resend.dev>';

  if (!apiKey || !inbox) {
    console.warn('[inquiry] RESEND_API_KEY or TRADE_INBOX missing — logging payload only');
    console.log({ firstName, lastName, firm, email, slab, context });
    return NextResponse.json({ ok: true, devFallback: true });
  }

  const resend = new Resend(apiKey);
  const extRef = randomUUID();

  const subject = fullName
    ? `Trade inquiry — ${fullName} (${firm})`
    : `Trade inquiry — ${firm}`;
  const text = [
    `Name: ${fullName || '(not provided)'}`,
    `Firm: ${firm}`,
    `Email: ${email}`,
    `Slab of interest: ${slab}`,
    '',
    'Project context:',
    context || '(none provided)',
  ].join('\n');

  try {
    const { error } = await resend.emails.send({
      from: sender,
      to: inbox,
      replyTo: email,
      subject,
      text,
    });
    if (error) throw error;
  } catch (err) {
    console.error('[inquiry] Resend error (internal notification)', err);
    return NextResponse.json({ error: 'Email failed to send' }, { status: 502 });
  }

  // Best-effort auto-reply to the customer, personalized to the chosen table.
  // A failure here must not fail the request — the internal notification already sent.
  try {
    // Per-lead tracked catalog link; falls back to the raw file if unsigned.
    const token = signCatalogToken({ firstName, lastName, firm, email, slab: rawSlab, extRef });
    const catalogUrl = token ? `${SITE_URL}/c/${token}` : `${SITE_URL}${CATALOG_FILE}`;
    const customer = buildCustomerEmail({
      firstName,
      slabName: matched?.name ?? null,
      essence: matched?.essence ?? null,
      catalogUrl,
    });
    const { error } = await resend.emails.send({
      from: sender,
      to: email,
      replyTo: inbox,
      subject: customer.subject,
      html: customer.html,
      text: customer.text,
    });
    if (error) throw error;
  } catch (err) {
    console.error('[inquiry] Resend error (customer auto-reply)', err);
  }

  // Best-effort: record the inquiry in the dashboard (USA trade pipeline).
  await postTradeEvent({
    type: 'inquiry',
    extRef,
    firstName,
    lastName,
    firm,
    email,
    slab: rawSlab || null,
    context: context || null,
  });

  return NextResponse.json({ ok: true });
}
