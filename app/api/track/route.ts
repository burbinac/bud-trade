import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { verifyCatalogToken } from '@/lib/catalog-token';
import { postTradeEvent } from '@/lib/dashboard-ingest';

// Receives the JS beacon from /c/<token>, decrypts the lead, and emails a
// "hot lead opened the catalog" alert to the trade inbox. Always returns ok —
// a bad/forged token is silently ignored, and email failures never surface.
export async function POST(req: Request) {
  let t: string | undefined;
  try {
    ({ t } = await req.json());
  } catch {
    return NextResponse.json({ ok: true });
  }
  if (!t) return NextResponse.json({ ok: true });

  const lead = verifyCatalogToken(t);
  if (!lead) return NextResponse.json({ ok: true });

  // Best-effort: record the open in the dashboard (increments opens count).
  await postTradeEvent({ type: 'open', extRef: lead.extRef });

  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.TRADE_INBOX;
  const sender = process.env.TRADE_SENDER ?? 'BUD Trade <onboarding@resend.dev>';

  if (!apiKey || !inbox) {
    console.log('[track] catalog opened', lead);
    return NextResponse.json({ ok: true, devFallback: true });
  }

  const when = new Date().toLocaleString('en-US', {
    timeZone: 'America/Costa_Rica',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const slabLine = lead.slab ? lead.slab : 'Full catalog (all nine slabs)';

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      from: sender,
      to: inbox,
      replyTo: lead.email,
      subject: `🔥 ${lead.firstName} ${lead.lastName} opened the Trade Collection`,
      text: [
        `${lead.firstName} ${lead.lastName} (${lead.firm}) just opened the Trade Collection.`,
        '',
        `Interested in: ${slabLine}`,
        `Email: ${lead.email}`,
        `When: ${when} (Costa Rica time)`,
        '',
        'Reply to this email to reach them directly.',
      ].join('\n'),
    });
    if (error) throw error;
  } catch (err) {
    console.error('[track] Resend error', err);
  }

  return NextResponse.json({ ok: true });
}
