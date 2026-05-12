import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bar Waterfall — Spec Sheet · Bernardo Urbina Design',
  description:
    'Custom Guanacaste live-edge bar with internal LED, designed and finished by Bernardo Urbina Design for The W.',
};

const PIECE = {
  client: 'The W',
  title: 'Bar Waterfall',
  essence: 'A 260-centimeter live-edge Guanacaste bar — internally lit, on casters.',
  hero: '/specs/the-w/bar-waterfall.png',
  dimensions: [
    { label: 'Length', value: '260 cm', secondary: '102"' },
    { label: 'Depth', value: '60 cm', secondary: '24"' },
    { label: 'Height', value: '110 cm', secondary: '43"' },
  ],
  materials: [
    { label: 'Top', value: 'Guanacaste, kiln-dried twice' },
    { label: 'Edge', value: 'Live-edge waterfall, one continuous slab' },
    { label: 'Top coat', value: '1K clear satin polyurethane' },
    { label: 'Base', value: 'Black lacquered cabinet on casters' },
    { label: 'Lighting', value: 'Internal warm LED, beneath the top' },
  ],
  provenance: [
    { label: 'Origin', value: 'Rural Guanacaste, Costa Rica' },
    { label: 'Harvest', value: 'Under MINAE permit' },
    { label: 'Drying', value: 'Italian conventional kiln, then iDry vacuum kiln' },
    { label: 'Finishing', value: 'Bernardo Urbina Design workshop' },
    { label: 'Signature', value: 'Signed, numbered, photographed for the file' },
  ],
  investment: [
    { label: 'Price', value: '₡1,685,880', secondary: '+ IVA' },
    { label: 'Type', value: 'Custom commission' },
    { label: 'Deposit', value: '50% to begin' },
    { label: 'Balance', value: 'Prior to shipping' },
    { label: 'Lead time', value: '13–15 weeks production' },
    { label: 'Delivery', value: 'Quoted separately or designer-arranged' },
  ],
};

export default function SpecSheetPage() {
  return (
    <main className="min-h-screen bg-[var(--ink)] text-[var(--cream)] print:bg-[var(--cream)] print:text-[var(--ink)]">
      <Header />

      <section className="mx-auto max-w-[1100px] px-6 pb-10 pt-12 text-center sm:px-10 md:pt-16">
        <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
          Custom Commission · {PIECE.client}
        </div>
        <h1 className="mb-5 font-[family-name:var(--font-cormorant)] text-[clamp(40px,6vw,72px)] font-normal leading-[1] text-[var(--cream)] print:text-[var(--ink)]">
          {PIECE.title}
        </h1>
        <p className="mx-auto max-w-[640px] font-[family-name:var(--font-cormorant)] text-[18px] font-normal italic leading-[1.4] text-[rgba(242,237,227,0.85)] print:text-[rgba(8,7,5,0.75)] md:text-[20px]">
          {PIECE.essence}
        </p>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pb-12 sm:px-10">
        <div className="overflow-hidden rounded-2xl bg-[rgba(8,7,5,0.5)] print:bg-transparent">
          <img
            src={PIECE.hero}
            alt={`${PIECE.title} — render`}
            className="block h-auto w-full"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] grid grid-cols-1 gap-10 px-6 pb-16 sm:px-10 md:grid-cols-2 md:gap-x-12 md:gap-y-14">
        <SpecBlock n="01" title="Dimensions" rows={PIECE.dimensions} />
        <SpecBlock n="02" title="Materials &amp; Finish" rows={PIECE.materials} />
        <SpecBlock n="03" title="Provenance" rows={PIECE.provenance} />
        <SpecBlock n="04" title="Investment" rows={PIECE.investment} />
      </section>

      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="border-b border-[var(--gold-dim)] print:border-[rgba(8,7,5,0.15)]">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-3">
          <img
            src="https://cdn.shopify.com/s/files/1/0690/6370/4883/files/Untitled-1.png"
            alt="BUD"
            className="h-8 w-auto print:hidden"
          />
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--cream)] print:text-[var(--ink)]">
            Bernardo Urbina Design
          </span>
        </div>
        <div className="text-[11px] font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
          Spec Sheet
        </div>
      </div>
    </header>
  );
}

type Row = { label: string; value: string; secondary?: string };

function SpecBlock({ n, title, rows }: { n: string; title: string; rows: Row[] }) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-start gap-5">
      <div className="font-[family-name:var(--font-cormorant)] text-[44px] font-normal leading-[0.85] text-[var(--gold)]">
        {n}
      </div>
      <div className="min-w-0">
        <h2
          className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--gold)]"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <dl className="flex flex-col gap-2.5">
          {rows.map((r) => (
            <div
              key={r.label}
              className="grid grid-cols-[100px_1fr] items-baseline gap-3 border-b border-[var(--gold-dim)] pb-2 last:border-b-0 last:pb-0 print:border-[rgba(8,7,5,0.12)]"
            >
              <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-[rgba(242,237,227,0.65)] print:text-[rgba(8,7,5,0.6)]">
                {r.label}
              </dt>
              <dd className="text-[14px] font-normal leading-[1.5] text-[var(--cream)] print:text-[var(--ink)]">
                {r.value}
                {r.secondary && (
                  <span className="ml-2 text-[rgba(242,237,227,0.55)] print:text-[rgba(8,7,5,0.5)]">
                    {r.secondary}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--gold-dim)] print:border-[rgba(8,7,5,0.15)]">
      <div className="mx-auto max-w-[1100px] px-6 py-10 text-center sm:px-10">
        <p className="font-[family-name:var(--font-cormorant)] text-[22px] font-normal italic text-[var(--gold)] md:text-[24px]">
          One tree. One table.
        </p>
        <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[rgba(242,237,227,0.7)] print:text-[rgba(8,7,5,0.6)]">
          Bernardo Urbina Design
        </p>
        <p className="mt-2 text-[12px] font-normal text-[rgba(242,237,227,0.6)] print:text-[rgba(8,7,5,0.55)]">
          trade@bernardourbina.com · bernardourbina.com
        </p>
        <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.22em] text-[rgba(242,237,227,0.5)] print:text-[rgba(8,7,5,0.45)]">
          Designed in Costa Rica · Finished in South Carolina · CAFTA-DR Duty-Free
        </p>
      </div>
    </footer>
  );
}
