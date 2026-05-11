'use client';

import { useEffect, useRef } from 'react';

type Step = {
  n: string;
  title: string;
  location: string;
  body: string;
  image?: string;
};

const STEPS: Step[] = [
  {
    n: '01',
    title: 'Select',
    location: 'Guanacaste',
    body: 'Old-growth slabs under MINAE permit. Bernardo picks each log.',
    image: '/process/select.jpg',
  },
  {
    n: '02',
    title: 'Mill',
    location: 'Costa Rica',
    body: 'Each cut deliberated. Slabs catalogued and named.',
    image: '/process/mill.jpg',
  },
  {
    n: '03',
    title: 'Kiln-Dry',
    location: 'On site',
    body: 'Six weeks airflow, twelve in the Italian kiln.',
    image: '/process/kiln.jpg',
  },
  {
    n: '04',
    title: 'Re-Kiln',
    location: 'Laurens, SC',
    body: 'iDry vacuum kiln calibrated to US interior moisture. Aspen to Miami stable.',
    image: '/process/rekiln.jpg',
  },
  {
    n: '05',
    title: 'Finish',
    location: 'Laurens, SC',
    body: '120-grit, 1K satin poly. Built for commercial use.',
    image: '/process/finish.jpg',
  },
  {
    n: '06',
    title: 'Deliver',
    location: 'To site',
    body: 'White-glove freight, room of choice, duty-free.',
  },
];

export function Process() {
  return (
    <section className="border-b border-[var(--gold-dim)] bg-[var(--ink-2)]">
      <div className="mx-auto flex max-w-[1440px] items-center gap-5 px-6 pb-6 pt-14 sm:px-10 md:px-16 md:pt-16 lg:px-[72px]">
        <div className="h-px flex-1 bg-[var(--gold-dim)]" />
        <span className="text-[12px] font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
          The Process
        </span>
        <div className="h-px flex-1 bg-[var(--gold-dim)]" />
      </div>

      <div className="mx-auto max-w-[760px] px-6 pb-8 text-center sm:px-10">
        <p className="text-[13px] font-normal leading-[1.7] text-[rgba(242,237,227,0.85)] md:text-[14px]">
          From the forest in Guanacaste to a dining room in the United States —
          <span className="text-[var(--gold)]"> sixteen to twenty weeks, six stages, one person overseeing every one.</span>
        </p>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 pb-16 sm:px-10 md:px-12 md:pb-20">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {STEPS.map((step, i) => (
            <Tile key={step.n} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Tile({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${Math.min(index, 5) * 40}ms` }}
      className="translate-y-3 opacity-0 transition-all duration-500 ease-out [&.in-view]:translate-y-0 [&.in-view]:opacity-100"
    >
      <div className="overflow-hidden rounded-xl bg-[rgba(8,7,5,0.5)]">
        {step.image ? (
          <div className="relative aspect-[4/3]">
            <img
              src={step.image}
              alt={`${step.title} — ${step.location}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,7,5,0.7)] via-transparent to-transparent" />
            <div className="absolute bottom-2 left-3 font-[family-name:var(--font-cormorant)] text-[28px] font-normal leading-none text-[var(--cream)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              {step.n}
            </div>
          </div>
        ) : (
          <div className="relative flex aspect-[4/3] items-center justify-center bg-[rgba(196,154,74,0.06)]">
            <div className="font-[family-name:var(--font-cormorant)] text-[56px] font-normal leading-none text-[var(--gold)]">
              {step.n}
            </div>
          </div>
        )}

        <div className="px-3.5 pb-3.5 pt-3">
          <h3 className="font-[family-name:var(--font-cormorant)] text-[18px] font-normal leading-none text-[var(--cream)]">
            {step.title}
          </h3>
          <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--gold)]">
            {step.location}
          </div>
          <p className="mt-2 text-[11px] font-normal leading-[1.55] text-[rgba(242,237,227,0.75)]">
            {step.body}
          </p>
        </div>
      </div>
    </div>
  );
}
