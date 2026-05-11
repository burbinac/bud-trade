'use client';

import { useState, useEffect } from 'react';
import { SLABS } from '@/lib/slabs';

type Status = 'idle' | 'sending' | 'sent' | 'error';

type Props = {
  selectedSlab: string;
  onSlabChange: (v: string) => void;
};

export function InquiryForm({ selectedSlab, onSlabChange }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'error') {
      const t = setTimeout(() => setStatus('idle'), 6000);
      return () => clearTimeout(t);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending' || status === 'sent') return;

    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get('company_website')) {
      // Honeypot tripped — silently "succeed" to avoid signaling.
      setStatus('sent');
      return;
    }

    setStatus('sending');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.get('firstName'),
          lastName: data.get('lastName'),
          firm: data.get('firm'),
          email: data.get('email'),
          slab: data.get('slab'),
          context: data.get('context'),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? 'Request failed');
      }
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const buttonLabel =
    status === 'sending'
      ? 'Sending…'
      : status === 'sent'
        ? 'Request Sent ✓'
        : 'Send Request →';

  return (
    <section id="inquiry" className="mx-auto max-w-[600px] px-6 py-24 text-center sm:px-10">
      <div className="mb-5 text-[9px] font-normal uppercase tracking-[0.3em] text-[var(--gold)]">
        Request Access
      </div>
      <div className="mx-auto mb-7 h-px w-12 bg-[var(--gold)]" />
      <h2 className="mb-4 font-[family-name:var(--font-cormorant)] text-[clamp(32px,5vw,56px)] font-normal text-[var(--cream)]">
        Request Spec Sheets
      </h2>
      <p className="mx-auto mb-12 max-w-md text-[12px] font-normal leading-[2] text-[rgba(242,237,227,0.7)]">
        We&apos;ll send the full 12-page trade catalog within one business day — dimensions, slab
        photography, base options, and trade pricing for all nine pieces.
      </p>

      <form className="flex flex-col gap-4 text-left" onSubmit={handleSubmit} noValidate>
        {/* Honeypot — hidden from humans, bots tend to fill it */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label>
            Website
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="First Name" name="firstName" placeholder="First" required />
          <Field label="Last Name" name="lastName" placeholder="Last" required />
        </div>
        <Field label="Firm / Studio" name="firm" placeholder="Your studio name" required />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@studio.com"
          required
        />

        <div className="flex flex-col gap-2">
          <label htmlFor="slab" className="text-[9px] font-normal uppercase tracking-[0.22em] text-[var(--gold)]">
            Slab of interest
          </label>
          <select
            id="slab"
            name="slab"
            value={selectedSlab}
            onChange={(e) => onSlabChange(e.target.value)}
            className="appearance-none rounded-lg border border-[var(--gold-dim)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[13px] font-normal text-[var(--cream)] outline-none transition-colors focus:border-[var(--gold)]"
          >
            <option value="">— Full catalog (all nine slabs)</option>
            {SLABS.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="context" className="text-[9px] font-normal uppercase tracking-[0.22em] text-[var(--gold)]">
            Project context
          </label>
          <textarea
            id="context"
            name="context"
            placeholder="Residential, hospitality, timeline…"
            rows={3}
            className="min-h-[88px] resize-y rounded-lg border border-[var(--gold-dim)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[13px] font-normal text-[var(--cream)] outline-none transition-colors placeholder:text-[rgba(242,237,227,0.3)] focus:border-[var(--gold)]"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending' || status === 'sent'}
          className="mt-2 w-full rounded-full px-7 py-4 text-[10px] font-normal uppercase tracking-[0.22em] text-[var(--ink)] shadow-[0_4px_24px_rgba(196,154,74,0.3)] transition-all duration-200 hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-90"
          style={{
            background:
              status === 'sent'
                ? '#4A7A50'
                : status === 'error'
                  ? '#7A4A4A'
                  : 'var(--gold)',
            color: status === 'sent' || status === 'error' ? 'var(--cream)' : 'var(--ink)',
          }}
        >
          {buttonLabel}
        </button>

        {status === 'error' && (
          <p className="text-center text-[11px] text-[rgba(242,237,227,0.7)]">
            {errorMessage ?? 'Something went wrong.'} Please email{' '}
            <a
              href="mailto:trade@bernardourbina.com"
              className="text-[var(--gold)] underline-offset-2 hover:underline"
            >
              trade@bernardourbina.com
            </a>{' '}
            instead.
          </p>
        )}
      </form>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-[9px] font-normal uppercase tracking-[0.22em] text-[var(--gold)]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="rounded-lg border border-[var(--gold-dim)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[13px] font-normal text-[var(--cream)] outline-none transition-colors placeholder:text-[rgba(242,237,227,0.3)] focus:border-[var(--gold)]"
      />
    </div>
  );
}
