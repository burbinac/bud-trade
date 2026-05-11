const TILES = [
  {
    n: 'Trade',
    title: 'Pricing on Approval',
    body: 'Designer, hospitality, and architectural accounts qualify for trade-program pricing.',
  },
  {
    n: '50%',
    title: 'Commission Deposit',
    body: 'Commission begins on deposit. Balance due prior to shipping. Each piece held exclusively.',
  },
  {
    n: 'White-Glove',
    title: 'Door-to-Door Delivery',
    body: 'ArcBest or Plycon to site. Room of choice, all packaging removed. CAFTA-DR duty-free.',
  },
  {
    n: '16–20',
    title: 'Week Lead Time',
    body: 'Design through fabrication through delivery. Full spec sheets provided at inquiry.',
  },
];

export function TradeProgram() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 md:px-12">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TILES.map((t) => (
          <div
            key={t.title}
            className="rounded-2xl bg-[var(--ink-2)] px-8 py-10"
          >
            <div className="mb-3 font-[family-name:var(--font-cormorant)] text-[clamp(32px,3.6vw,44px)] font-normal leading-none text-[var(--gold)]">
              {t.n}
            </div>
            <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--cream)]">
              {t.title}
            </div>
            <div className="text-[12px] font-normal leading-[1.8] text-[rgba(242,237,227,0.85)]">
              {t.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
