'use client';

import { SLABS, type Slab } from '@/lib/slabs';

type Props = {
  onInquire: (slabName: string) => void;
};

export function Collection({ onInquire }: Props) {
  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-20 sm:px-10 md:px-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SLABS.map((slab) => (
          <Card key={slab.slug} slab={slab} onInquire={onInquire} />
        ))}
      </div>
    </div>
  );
}

function Card({ slab, onInquire }: { slab: Slab; onInquire: (n: string) => void }) {
  const handle = () => onInquire(slab.name);

  return (
    <article className="group overflow-hidden rounded-2xl bg-[var(--ink-2)] transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[3/2] overflow-hidden">
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
          <span className="inline-flex items-center justify-center rounded-full bg-[var(--gold)] px-7 py-3 text-[9px] font-normal uppercase tracking-[0.2em] text-[var(--ink)] shadow-[0_4px_20px_rgba(196,154,74,0.25)]">
            Request Spec Sheet
          </span>
        </button>
      </div>

      <div className="px-6 pb-6 pt-5">
        <div className="mb-2 text-[8px] font-light uppercase tracking-[0.22em] text-[var(--gold)]">
          {slab.tag}
        </div>
        <div className="mb-2 font-[family-name:var(--font-cormorant)] text-[26px] font-light leading-none text-[var(--cream)]">
          {slab.name}
        </div>
        <div className="mb-4 text-[11px] font-light tracking-[0.06em] text-[rgba(242,237,227,0.6)]">
          <span>{slab.wood}</span>
          <span className="mx-1.5 text-[var(--gold-dim)]">·</span>
          <span>{slab.length}</span>
          <span className="mx-1.5 text-[var(--gold-dim)]">·</span>
          <span>{slab.seats}</span>
        </div>
        <div className="flex items-center justify-between border-t border-[var(--gold-dim)] pt-4">
          <span className="text-[9px] font-light uppercase tracking-[0.16em] text-[rgba(242,237,227,0.7)]">
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
    </article>
  );
}
