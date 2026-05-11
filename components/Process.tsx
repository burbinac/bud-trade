'use client';

import { useEffect, useRef } from 'react';

type Step = {
  n: string;
  title: string;
  location: string;
  duration: string;
  body: string;
};

const STEPS: Step[] = [
  {
    n: '01',
    title: 'Select',
    location: 'Guanacaste, Costa Rica',
    duration: 'Single-tree provenance',
    body: 'Every piece begins with a single fallen tree. Bernardo selects each log personally at the mill in Guanacaste province — validating its MINAE harvest permit, its age, and the promise of its grain. Costa Rica only allows old-growth Guanacaste and Monkey Pod under strict environmental oversight, and each tree arrives documented from its origin.',
  },
  {
    n: '02',
    title: 'Mill',
    location: 'Costa Rica Mill',
    duration: 'Deliberated cuts',
    body: 'Bernardo deliberates over how each log will be cut. The slab inside is not yet visible; the right cut reveals the story the wood wants to tell. A bookmatched live edge. A single uninterrupted plank. Once cut, the slab is photographed, catalogued, and assigned its name.',
  },
  {
    n: '03',
    title: 'Dry',
    location: 'Italian kiln, on site',
    duration: '18 weeks',
    body: 'A six-week pre-drying phase under shaded airflow allows the cell structure to relax. Then the slab enters an Italian kiln calibrated to US moisture standards — a controlled descent that takes another twelve weeks. By the time it leaves the kiln, the slab is stable enough to live in any climate from Aspen to Miami.',
  },
  {
    n: '04',
    title: 'Finish',
    location: 'Laurens, South Carolina',
    duration: 'Hand-rubbed',
    body: 'The slab travels by container to the South Carolina workshop, where every piece is hand-finished. Sanded to a 120-grit surface, oiled by hand so the grain reads forward without losing its depth. Steel or hardwood bases are welded and lacquered to spec.',
  },
  {
    n: '05',
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
          Sixteen to twenty weeks. Five stages. One person overseeing every one of them.
        </p>
      </div>

      <div className="mx-auto max-w-[1100px] px-6 pb-24 sm:px-10 md:px-16 lg:px-[72px]">
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

  return (
    <div
      ref={ref}
      className="translate-y-6 opacity-0 transition-all duration-700 ease-out [&.in-view]:translate-y-0 [&.in-view]:opacity-100"
    >
      <div
        className={`grid grid-cols-1 gap-8 py-10 md:grid-cols-[1fr_2fr] md:gap-16 md:py-14 ${
          reverse ? 'md:grid-cols-[2fr_1fr]' : ''
        }`}
      >
        <div className={`flex flex-col ${reverse ? 'md:order-2 md:items-end md:text-right' : ''}`}>
          <div className="font-[family-name:var(--font-cormorant)] text-[clamp(72px,10vw,128px)] font-normal leading-[0.85] text-[var(--gold)]">
            {step.n}
          </div>
          <div className="mt-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[rgba(242,237,227,0.65)]">
            {step.location}
          </div>
          <div className="mt-1 text-[11px] font-normal uppercase tracking-[0.2em] text-[var(--gold)]">
            {step.duration}
          </div>
        </div>

        <div className={`flex flex-col justify-center ${reverse ? 'md:order-1' : ''}`}>
          <h3 className="mb-4 font-[family-name:var(--font-cormorant)] text-[clamp(28px,3.6vw,40px)] font-normal leading-[1.15] text-[var(--cream)]">
            {step.title}
          </h3>
          <p className="text-[14px] font-normal leading-[1.9] text-[rgba(242,237,227,0.85)] md:text-[15px]">
            {step.body}
          </p>
        </div>
      </div>

      {!isLast && <div className="h-px w-full bg-[var(--gold-dim)]" />}
    </div>
  );
}
