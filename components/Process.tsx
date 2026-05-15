'use client';

import { useEffect, useRef } from 'react';

type Step = {
  n: string;
  title: string;
  location: string;
  body: string;
  image?: string;
};

type CountryGroup = {
  country: string;
  range: string;
  steps: Step[];
};

const GROUPS: CountryGroup[] = [
  {
    country: 'Costa Rica',
    range: '01 — 03',
    steps: [
      {
        n: '01',
        title: 'Select',
        location: 'Guanacaste',
        body: 'A fallen tree on a farmer’s land in rural Guanacaste, harvested under MINAE permit. Bernardo selects every log personally — species, age, grain.',
        image: '/process/select.jpg',
      },
      {
        n: '02',
        title: 'Mill',
        location: 'Costa Rica Mill',
        body: 'Bernardo decides how each log will be cut. The right cut reveals what the wood wants to be — then the slab is photographed, catalogued, and named.',
        image: '/process/mill.jpg',
      },
      {
        n: '03',
        title: 'Kiln-Dry',
        location: 'On site',
        body: 'Two and a half to three months of controlled descent. Shaded airflow, then the Italian kiln on site. The slab leaves Costa Rica uniform and stable.',
        image: '/process/kiln.jpg',
      },
    ],
  },
  {
    country: 'United States',
    range: '04 — 06',
    steps: [
      {
        n: '04',
        title: 'Re-Kiln',
        location: 'South Carolina',
        body: 'iDry vacuum kiln calibrated to US interior moisture. From Aspen winter to Miami humidity, the slab holds stable — moisture measured and recorded for every piece.',
        image: '/process/rekiln.jpg',
      },
      {
        n: '05',
        title: 'Finish',
        location: 'South Carolina',
        body: '120-grit sanding, then 1K clear satin polyurethane — commercial-grade for chef’s tables, hotel lobbies, boardrooms. Every piece signed, numbered, and photographed before shipping.',
        image: '/process/finish.jpg',
      },
      {
        n: '06',
        title: 'Ship',
        location: 'From South Carolina',
        body: 'White-glove freight on quote — ArcBest, Plycon, or your preferred carrier. CAFTA-DR duty-free, room of choice, packaging removed on site.',
        image: '/process/ship.jpg',
      },
    ],
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

      <div className="mx-auto max-w-[820px] px-6 pb-10 text-center sm:px-10">
        <p className="text-[15px] font-normal leading-[1.7] text-[rgba(242,237,227,0.9)] md:text-[16px]">
          From a farmer’s tree in rural Guanacaste to the South Carolina workshop —
          <span className="text-[var(--gold)]"> thirteen to fifteen weeks of production, six stages, one person overseeing every one.</span>
        </p>
      </div>

      <div className="mx-auto max-w-[1200px] space-y-12 px-6 pb-16 sm:px-10 md:px-12 md:pb-20 md:space-y-14">
        {GROUPS.map((group) => (
          <CountryRow key={group.country} group={group} />
        ))}
      </div>
    </section>
  );
}

function CountryRow({ group }: { group: CountryGroup }) {
  return (
    <div>
      <div className="mb-7 flex items-center gap-4 md:mb-8">
        <div className="text-[11px] font-medium uppercase tracking-[0.32em] text-[rgba(242,237,227,0.55)]">
          {group.range}
        </div>
        <div className="font-[family-name:var(--font-cormorant)] text-[24px] font-normal italic tracking-[0.02em] text-[var(--gold)] md:text-[28px]">
          {group.country}
        </div>
        <div className="h-px flex-1 bg-[var(--gold-dim)]" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {group.steps.map((step, i) => (
          <Tile key={step.n} step={step} index={i} />
        ))}
      </div>
    </div>
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
      <div className="overflow-hidden rounded-2xl bg-[rgba(8,7,5,0.5)]">
        {step.image ? (
          <div className="relative aspect-[16/10]">
            <img
              src={step.image}
              alt={`${step.title} — ${step.location}`}
              className="absolute inset-0 h-full w-full object-cover [filter:saturate(1.08)_contrast(1.1)_brightness(0.86)]"
            />
            {/* Subtle warm overlay that preserves the wood's natural amber */}
            <div className="pointer-events-none absolute inset-0 bg-[rgba(196,154,74,0.06)] mix-blend-overlay" />
            {/* Bottom gradient for step number legibility */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(8,7,5,0.82)] via-[rgba(8,7,5,0.15)] to-transparent" />
            <div className="absolute bottom-3 left-5 font-[family-name:var(--font-cormorant)] text-[48px] font-normal leading-none text-[var(--cream)] drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
              {step.n}
            </div>
          </div>
        ) : (
          <div className="relative flex aspect-[16/10] items-center justify-center bg-[rgba(196,154,74,0.06)]">
            <div className="font-[family-name:var(--font-cormorant)] text-[88px] font-normal leading-none text-[var(--gold)]">
              {step.n}
            </div>
          </div>
        )}

        <div className="px-6 pb-6 pt-5">
          <h3 className="font-[family-name:var(--font-cormorant)] text-[26px] font-normal leading-none text-[var(--cream)]">
            {step.title}
          </h3>
          <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--gold)]">
            {step.location}
          </div>
          <p className="mt-3 text-[14px] font-normal leading-[1.7] text-[rgba(242,237,227,0.88)] md:text-[15px]">
            {step.body}
          </p>
        </div>
      </div>
    </div>
  );
}
