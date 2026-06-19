'use client';

import { useState, useEffect } from 'react';
import { SLABS } from '@/lib/slabs';

type Status = 'idle' | 'sending' | 'sent' | 'error';

type Props = {
  selectedSlab: string;
  onSlabChange: (v: string) => void;
};

const NEXT_STEPS = [
  {
    n: '01',
    title: 'Spec sheets',
    body: 'The 12-page trade catalog arrives in your inbox within one business day — dimensions, base options, finishes, and trade pricing for all nine pieces.',
  },
  {
    n: '02',
    title: 'Define',
    body: 'Real photography of the slabs being considered, plus base options (steel or hardwood) and any design details. Everything signed off before commission begins.',
  },
  {
    n: '03',
    title: 'Commission',
    body: 'A 50% deposit secures the slab. Bernardo signs the spec sheet, and the piece enters the 13–15 week production schedule in South Carolina.',
  },
  {
    n: '04',
    title: 'Ship',
    body: 'White-glove freight is quoted on completion — ArcBest, Plycon, or your preferred carrier. Or arrange your own delivery from the workshop.',
  },
];

export function InquiryForm({ selectedSlab, onSlabChange }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showOptional, setShowOptional] = useState(false);

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
          firstName: data.get('firstName') || '',
          lastName: data.get('lastName') || '',
          firm: data.get('firm'),
          email: data.get('email'),
          slab: data.get('slab'),
          context: data.get('context') || '',
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
    <section id="inquiry" className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 md:px-16 lg:px-[72px]">
      <div className="mb-12 text-center md:mb-16">
        <div className="mb-5 text-[12px] font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
          Request Access
        </div>
        <div className="mx-auto mb-7 h-px w-12 bg-[var(--gold)]" />
        <h2 className="mb-4 font-[family-name:var(--font-cormorant)] text-[clamp(32px,5vw,56px)] font-normal text-[var(--cream)]">
          Request Spec Sheets
        </h2>
        <p className="mx-auto max-w-md text-[14px] font-normal leading-[1.9] text-[rgba(242,237,227,0.85)]">
          The full trade catalog lands in your inbox the moment you submit — and here&apos;s
          what happens after that.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
        <NextSteps />

        <div className="flex h-full flex-col">
          <div className="mb-8 text-[11px] font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
            Your details
          </div>
          <form className="flex flex-1 flex-col gap-7 text-left" onSubmit={handleSubmit} noValidate>
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

            <NumberedRow n="01">
              <Field
                label="Work Email"
                name="email"
                type="email"
                placeholder="you@studio.com"
                required
              />
            </NumberedRow>

            <NumberedRow n="02">
              <Field label="Firm / Studio" name="firm" placeholder="Your studio name" required />
            </NumberedRow>

            <NumberedRow n="03">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="slab" className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--gold)]">
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

                {!showOptional && (
                  <button
                    type="button"
                    onClick={() => setShowOptional(true)}
                    className="self-start text-[10px] font-normal uppercase tracking-[0.22em] text-[rgba(242,237,227,0.6)] transition-colors hover:text-[var(--gold)]"
                  >
                    + Add project details (optional)
                  </button>
                )}

                {showOptional && (
                  <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="First Name" name="firstName" placeholder="First" />
                      <Field label="Last Name" name="lastName" placeholder="Last" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="context" className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--gold)]">
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
                  </>
                )}
              </div>
            </NumberedRow>

            <NumberedRow n="04">
              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'sent'}
                  className="w-full rounded-full px-7 py-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--ink)] shadow-[0_4px_24px_rgba(196,154,74,0.3)] transition-all duration-200 hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-90"
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

                <p className="text-[11px] font-normal leading-[1.6] text-[rgba(242,237,227,0.65)]">
                  Or email Bernardo directly at{' '}
                  <a
                    href="mailto:trade@bernardourbina.com"
                    className="text-[var(--gold)] underline-offset-2 hover:underline"
                  >
                    trade@bernardourbina.com
                  </a>
                  . He replies personally within one business day.
                </p>
              </div>
            </NumberedRow>

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
        </div>
      </div>
    </section>
  );
}

function NumberedRow({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-start gap-5">
      <div className="font-[family-name:var(--font-cormorant)] text-[36px] font-normal leading-[0.85] text-[var(--gold)]">
        {n}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function NextSteps() {
  return (
    <div>
      <div className="mb-8 text-[11px] font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
        What happens next
      </div>
      <ol className="space-y-7">
        {NEXT_STEPS.map((step) => (
          <li key={step.n} className="grid grid-cols-[auto_1fr] gap-5">
            <div className="font-[family-name:var(--font-cormorant)] text-[36px] font-normal leading-[0.85] text-[var(--gold)]">
              {step.n}
            </div>
            <div>
              <h3 className="mb-1.5 font-[family-name:var(--font-cormorant)] text-[22px] font-normal leading-none text-[var(--cream)]">
                {step.title}
              </h3>
              <p className="text-[13px] font-normal leading-[1.75] text-[rgba(242,237,227,0.85)] md:text-[14px]">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
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
      <label htmlFor={name} className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--gold)]">
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
