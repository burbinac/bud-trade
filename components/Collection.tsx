'use client';

import { useEffect, useRef } from 'react';
import { SLABS, type Slab } from '@/lib/slabs';

type Props = {
  onInquire: (slabName: string) => void;
};

export function Collection({ onInquire }: Props) {
  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-20 sm:px-10 md:px-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SLABS.map((slab, i) => (
          <Card
            key={slab.slug}
            slab={slab}
            index={i}
            onInquire={onInquire}
            featured={i === 0}
            orphan={i === SLABS.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function Card({
  slab,
  index,
  featured,
  orphan,
  onInquire,
}: {
  slab: Slab;
  index: number;
  featured: boolean;
  orphan: boolean;
  onInquire: (n: string) => void;
}) {
  const ref = useRef<HTMLElement | null>(null);

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
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handle = () => onInquire(slab.name);

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${Math.min(index, 5) * 60}ms` }}
      className={`group translate-y-4 opacity-0 transition-all duration-700 ease-out [&.in-view]:translate-y-0 [&.in-view]:opacity-100 ${
        featured ? 'lg:col-span-2' : ''
      } ${
        orphan
          ? 'sm:col-span-2 sm:mx-auto sm:max-w-[calc(50%-12px)] lg:col-span-1 lg:col-start-2 lg:mx-0 lg:max-w-none'
          : ''
      }`}
    >
      <div className="overflow-hidden rounded-2xl bg-[var(--ink-2)] transition-transform duration-300 hover:-translate-y-1">
        <div className={`relative overflow-hidden ${featured ? 'aspect-[16/9]' : 'aspect-[3/2]'}`}>
          <img
            src={slab.image}
            alt={slab.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <button
            type="button"
            onClick={handle}
            className="absolute inset-0 hidden items-center justify-center bg-[rgba(8,7,5,0.55)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex"
          >
            <span className="inline-flex items-center justify-center rounded-full bg-[var(--gold)] px-7 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--ink)] shadow-[0_4px_20px_rgba(196,154,74,0.25)]">
              Request Spec Sheet
            </span>
          </button>
        </div>

        <div className="px-6 pb-6 pt-5">
          <div className="mb-2 text-[8px] font-normal uppercase tracking-[0.22em] text-[var(--gold)]">
            {slab.tag}
          </div>
          <div className={`mb-2 font-[family-name:var(--font-cormorant)] font-normal leading-none text-[var(--cream)] ${featured ? 'text-[36px]' : 'text-[26px]'}`}>
            {slab.name}
          </div>
          <div className="mb-4 text-[11px] font-normal tracking-[0.06em] text-[rgba(242,237,227,0.7)]">
            <span>{slab.wood}</span>
            <span className="mx-1.5 text-[var(--gold-dim)]">·</span>
            <span>{slab.length}</span>
            <span className="mx-1.5 text-[var(--gold-dim)]">·</span>
            <span>{slab.seats}</span>
          </div>
          <div className="flex items-center justify-between border-t border-[var(--gold-dim)] pt-4">
            <span className="text-[9px] font-normal uppercase tracking-[0.16em] text-[rgba(242,237,227,0.85)]">
              Inquire for pricing
            </span>
            <button
              type="button"
              onClick={handle}
              className="inline-flex items-center justify-center rounded-full border border-[rgba(242,237,227,0.3)] bg-transparent px-5 py-2.5 text-[9px] font-normal uppercase tracking-[0.2em] text-[var(--cream)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              Request Spec Sheet →
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
