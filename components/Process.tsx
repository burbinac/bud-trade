'use client';

import { useEffect, useRef } from 'react';

type Step = {
  n: string;
  title: string;
  location: string;
  duration: string;
  body: string;
  image?: string;
};

const STEPS: Step[] = [
  {
    n: '01',
    title: 'Select',
    location: 'Guanacaste, Costa Rica',
    duration: 'Single-tree provenance',
    body: 'Old-growth Guanacaste and Monkey Pod, harvested under MINAE permit. Bernardo selects each log personally.',
    image: '/process/select.jpg',
  },
  {
    n: '02',
    title: 'Mill',
    location: 'Costa Rica Mill',
    duration: 'Deliberated cuts',
    body: 'Bernardo decides each cut. Every slab is photographed, catalogued, and assigned its name on the spot.',
    image: '/process/mill.jpg',
  },
  {
    n: '03',
    title: 'Kiln-Dry',
    location: 'Italian kiln, on site',
    duration: '18 weeks',
    body: 'Six weeks of shaded pre-drying, then twelve in the Italian kiln. The slab leaves Costa Rica stable.',
    image: '/process/kiln.jpg',
  },
  {
    n: '04',
    title: 'Re-Kiln',
    location: 'Laurens, South Carolina',
    duration: 'US moisture acclimation',
    body: 'A second kiln in Laurens, calibrated to US interior moisture. Holds in any US climate, Aspen to Miami.',
  },
  {
    n: '05',
    title: 'Finish',
    location: 'Laurens, South Carolina',
    duration: 'Commercial-grade satin',
    body: '120-grit sanding, 1K clear satin polyurethane. Built for chef’s tables, hotel lobbies, and boardrooms.',
    image: '/process/finish.jpg',
  },
  {
    n: '06',
    title: 'Deliver',
    location: 'White-glove to site',
    duration: 'Room of choice',
    body: 'White-glove freight by ArcBest or Plycon. Room of choice, all packaging removed. CAFTA-DR duty-free.',
  },
];

export function Process() {
  return (
    <section className="border-b border-[var(--gold-dim)] bg-[var(--ink-2)]">
      <div className="mx-auto flex max-w-[1440px] items-center gap-5 px-6 pb-8 pt-16 sm:px-10 md:px-16 md:pt-20 lg:px-[72px]">
        <div className="h-px flex-1 bg-[var(--gold-dim)]" />
        <span className="text-[12px] font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
          The Process
        </span>
        <div className="h-px flex-1 bg-[var(--gold-dim)]" />
      </div>

      <div className="mx-auto max-w-[820px] px-6 pb-10 text-center sm:px-10">
        <h2 className="mx-auto max-w-[600px] font-[family-name:var(--font-cormorant)] text-[clamp(28px,3.6vw,40px)] font-normal leading-[1.2] text-[var(--cream)]">
          From the forest in Guanacaste to a dining room in the United States.
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-[13px] font-normal leading-[1.8] text-[rgba(242,237,227,0.85)] md:text-[14px]">
          Sixteen to twenty weeks. Six stages. One person overseeing every one.
        </p>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 pb-20 sm:px-10 md:px-12 md:pb-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${Math.min(index, 5) * 50}ms` }}
      className="translate-y-4 opacity-0 transition-all duration-700 ease-out [&.in-view]:translate-y-0 [&.in-view]:opacity-100"
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
            <div className="absolute bottom-3 left-4 font-[family-name:var(--font-cormorant)] text-[44px] font-normal leading-none text-[var(--cream)] drop-shadow-[0_4px_18px_rgba(0,0,0,0.6)]">
              {step.n}
            </div>
          </div>
        ) : (
          <div className="relative flex aspect-[16/10] items-center justify-center bg-[rgba(196,154,74,0.06)]">
            <div className="font-[family-name:var(--font-cormorant)] text-[96px] font-normal leading-none text-[var(--gold)]">
              {step.n}
            </div>
          </div>
        )}

        <div className="px-5 pb-5 pt-4">
          <h3 className="font-[family-name:var(--font-cormorant)] text-[24px] font-normal leading-none text-[var(--cream)]">
            {step.title}
          </h3>
          <div className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--gold)]">
            {step.location}
            <span className="mx-1.5 text-[var(--gold-dim)]">·</span>
            <span className="text-[rgba(242,237,227,0.6)]">{step.duration}</span>
          </div>
          <p className="mt-3 text-[13px] font-normal leading-[1.7] text-[rgba(242,237,227,0.85)]">
            {step.body}
          </p>
        </div>
      </div>
    </div>
  );
}
