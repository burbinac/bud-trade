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
        body: 'Each piece begins as a single fallen tree in the Guanacaste rainforest, harvested under MINAE permit — Costa Rica’s national environmental authority. Bernardo selects every log personally, walking the lot to validate the species, the age, and the promise of the grain before the wood ever leaves the forest.',
        image: '/process/select.jpg',
      },
      {
        n: '02',
        title: 'Mill',
        location: 'Costa Rica Mill',
        body: 'At the mill, Bernardo decides how each log will be cut. The slab hidden inside isn’t visible from the outside — the right cut reveals what the wood wants to be: a bookmatched live edge, an uninterrupted plank, a sculptural cross-section. Once cut, every slab is photographed, catalogued, and given its name.',
        image: '/process/mill.jpg',
      },
      {
        n: '03',
        title: 'Kiln-Dry',
        location: 'On site',
        body: 'For two and a half to three months the slab undergoes a controlled descent. Weeks of shaded airflow let the cellular structure relax, then it enters an Italian conventional kiln on site. By the time it leaves Costa Rica, the slab’s internal moisture is uniform and stable enough for the journey north.',
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
        location: 'Laurens, SC',
        body: 'In Laurens, every slab enters an iDry vacuum kiln calibrated to US interior moisture levels. This second kiln is what allows a Costa Rican slab to live in any US climate — from Aspen winter air to Miami coastal humidity — without cupping, splitting, or warping years down the line. Each piece exits with its moisture content individually measured and recorded.',
        image: '/process/rekiln.jpg',
      },
      {
        n: '05',
        title: 'Finish',
        location: 'Laurens, SC',
        body: 'The slab is sanded to a 120-grit surface, then finished with multiple coats of 1K clear satin polyurethane — a commercial-grade top coat built for chef’s tables, hotel lobbies, and boardrooms. Steel or hardwood bases are welded and lacquered to spec. Every piece is signed, numbered, and photographed before it leaves the workshop.',
        image: '/process/finish.jpg',
      },
      {
        n: '06',
        title: 'Ship',
        location: 'From Laurens, SC',
        body: 'White-glove freight is quoted on request from the workshop — ArcBest, Plycon, or a designer’s preferred carrier. CAFTA-DR duty-free, room-of-choice delivery, all packaging removed on site. The piece arrives in your client’s home as Bernardo signed it.',
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
          From the forest in Guanacaste to the Laurens workshop —
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
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,7,5,0.7)] via-transparent to-transparent" />
            <div className="absolute bottom-3 left-5 font-[family-name:var(--font-cormorant)] text-[48px] font-normal leading-none text-[var(--cream)] drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
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
