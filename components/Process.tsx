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
    body: 'Every piece begins with a single fallen tree. Bernardo selects each log personally at the mill in Guanacaste province — validating its MINAE harvest permit, its age, and the promise of its grain. Costa Rica only allows old-growth Guanacaste and Monkey Pod under strict environmental oversight, and each tree arrives documented from its origin.',
    image: '/process/select.jpg',
  },
  {
    n: '02',
    title: 'Mill',
    location: 'Costa Rica Mill',
    duration: 'Deliberated cuts',
    body: 'Bernardo deliberates over how each log will be cut. The slab inside is not yet visible; the right cut reveals the story the wood wants to tell. A bookmatched live edge. A single uninterrupted plank. Once cut, the slab is photographed, catalogued, and assigned its name.',
    image: '/process/mill.jpg',
  },
  {
    n: '03',
    title: 'Kiln-Dry',
    location: 'Italian kiln, on site',
    duration: '18 weeks',
    body: 'A six-week pre-drying phase under shaded airflow allows the cell structure to relax. The slab then enters the Italian kiln on site — a controlled descent that takes another twelve weeks. By the time it leaves Costa Rica, the slab is dry, stable, and ready to make the journey north.',
    image: '/process/kiln.jpg',
  },
  {
    n: '04',
    title: 'Re-Kiln',
    location: 'Laurens, South Carolina',
    duration: 'US moisture acclimation',
    body: 'In Laurens, every slab enters a second kiln calibrated to US interior moisture levels. This re-acclimation is what allows a Costa Rican slab to live in any climate — from Aspen winter air to Miami coastal humidity — without cupping, splitting, or warping years down the line. Each piece exits with its moisture content individually measured and documented.',
  },
  {
    n: '05',
    title: 'Finish',
    location: 'Laurens, South Carolina',
    duration: 'Hand-rubbed',
    body: 'Sanded to a 120-grit surface, then hand-rubbed with a natural oil that brings the grain forward without obscuring it. Steel or hardwood bases are welded and lacquered to spec. Every finished piece is signed, numbered, and photographed for the file before it leaves the workshop.',
    image: '/process/finish.jpg',
  },
  {
    n: '06',
    title: 'Deliver',
    location: 'White-glove to site',
    duration: 'Room of choice',
    body: 'White-glove freight by ArcBest or Plycon to the room of choice. All packaging removed, all hardware placed. CAFTA-DR duty-free. The piece that arrives is the piece Bernardo chose, sixteen to twenty weeks earlier.',
  },
];

export function Process() {
  return (
    <section className="border-b border-[var(--gold-dim)] bg-[var(--ink-2)]">
      <div className="mx-auto flex max-w-[1440px] items-center gap-5 px-6 pb-10 pt-16 sm:px-10 md:px-16 md:pb-10 md:pt-20 lg:px-[72px]">
        <div className="h-px flex-1 bg-[var(--gold-dim)]" />
        <span className="text-[12px] font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
          The Process
        </span>
        <div className="h-px flex-1 bg-[var(--gold-dim)]" />
      </div>

      <div className="mx-auto max-w-[920px] px-6 pb-8 text-center sm:px-10">
        <h2 className="mx-auto max-w-[700px] font-[family-name:var(--font-cormorant)] text-[clamp(32px,4.5vw,48px)] font-normal leading-[1.15] text-[var(--cream)]">
          From the forest in Guanacaste to a dining room in the United States.
        </h2>
        <p className="mx-auto mt-5 max-w-[600px] text-[14px] font-normal leading-[1.9] text-[rgba(242,237,227,0.85)] md:text-[15px]">
          Sixteen to twenty weeks. Six stages. One person overseeing every one of them.
        </p>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 pb-24 sm:px-10 md:px-16 lg:px-[72px]">
        {STEPS.map((step, i) => (
          <StepBlock key={step.n} step={step} index={i} isLast={i === STEPS.length - 1} />
        ))}
      </div>
    </section>
  );
}

function StepBlock({
  step,
  index,
  isLast,
}: {
  step: Step;
  index: number;
  isLast: boolean;
}) {
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
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reverse = index % 2 === 1;
  const hasImage = Boolean(step.image);

  return (
    <div
      ref={ref}
      className="translate-y-6 opacity-0 transition-all duration-700 ease-out [&.in-view]:translate-y-0 [&.in-view]:opacity-100"
    >
      {hasImage ? (
        <div className="grid grid-cols-1 gap-8 py-10 md:grid-cols-[5fr_6fr] md:gap-14 md:py-14">
          <div className={`relative overflow-hidden rounded-2xl bg-[rgba(8,7,5,0.4)] ${reverse ? 'md:order-2' : ''}`}>
            <div className="relative aspect-[4/5]">
              <img
                src={step.image}
                alt={`${step.title} — ${step.location}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,7,5,0.55)] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 font-[family-name:var(--font-cormorant)] text-[clamp(56px,8vw,96px)] font-normal leading-[0.85] text-[var(--cream)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
                {step.n}
              </div>
            </div>
          </div>

          <div className={`flex flex-col justify-center ${reverse ? 'md:order-1' : ''}`}>
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--gold)]">
              {step.location}
            </div>
            <h3 className="mt-3 font-[family-name:var(--font-cormorant)] text-[clamp(28px,3.6vw,40px)] font-normal leading-[1.15] text-[var(--cream)]">
              {step.title}
            </h3>
            <div className="mt-2 text-[11px] font-normal uppercase tracking-[0.2em] text-[rgba(242,237,227,0.65)]">
              {step.duration}
            </div>
            <p className="mt-6 text-[14px] font-normal leading-[1.9] text-[rgba(242,237,227,0.85)] md:text-[15px]">
              {step.body}
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-auto grid max-w-[760px] grid-cols-1 gap-6 py-10 text-center md:py-14">
          <div className="font-[family-name:var(--font-cormorant)] text-[clamp(56px,7vw,96px)] font-normal leading-[0.85] text-[var(--gold)]">
            {step.n}
          </div>
          <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--gold)]">
            {step.location}
          </div>
          <h3 className="font-[family-name:var(--font-cormorant)] text-[clamp(28px,3.6vw,40px)] font-normal leading-[1.15] text-[var(--cream)]">
            {step.title}
          </h3>
          <div className="text-[11px] font-normal uppercase tracking-[0.2em] text-[rgba(242,237,227,0.65)]">
            {step.duration}
          </div>
          <p className="mx-auto max-w-[640px] text-[14px] font-normal leading-[1.9] text-[rgba(242,237,227,0.85)] md:text-[15px]">
            {step.body}
          </p>
        </div>
      )}

      {!isLast && <div className="h-px w-full bg-[var(--gold-dim)]" />}
    </div>
  );
}
