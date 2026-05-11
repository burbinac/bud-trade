import { NextResponse } from 'next/server';
import { Resend } from 'resend';

type Body = {
  firstName?: string;
  lastName?: string;
  firm?: string;
  email?: string;
  slab?: string;
  context?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const firstName = body.firstName?.trim();
  const lastName = body.lastName?.trim();
  const firm = body.firm?.trim();
  const email = body.email?.trim();
  const slab = body.slab?.trim() || 'Full catalog (all nine slabs)';
  const context = body.context?.trim() || '';

  if (!firstName || !lastName || !firm || !email) {
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

  const subject = `Trade inquiry — ${firstName} ${lastName} (${firm})`;
  const text = [
    `Name: ${firstName} ${lastName}`,
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
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[inquiry] Resend error', err);
    return NextResponse.json({ error: 'Email failed to send' }, { status: 502 });
  }
}
