const PLACEMENTS = [
  { city: 'Manhattan', project: 'Private residence', year: '2025' },
  { city: 'Aspen', project: 'Mountain lodge', year: '2025' },
  { city: 'Miami', project: 'Coastal residence', year: '2024' },
  { city: 'Nashville', project: "Chef's table", year: '2024' },
  { city: 'Austin', project: 'Hotel lobby', year: '2024' },
  { city: 'Chicago', project: 'Corporate boardroom', year: '2024' },
];

export function Placements() {
  return (
    <section className="border-b border-[var(--gold-dim)]">
      <div className="mx-auto flex max-w-[1440px] items-center gap-5 px-6 pb-10 pt-16 sm:px-10 md:px-16 md:pb-10 md:pt-20 lg:px-[72px]">
        <div className="h-px flex-1 bg-[var(--gold-dim)]" />
        <span className="text-[10px] font-normal uppercase tracking-[0.3em] text-[var(--gold)]">
          Recently Placed
        </span>
        <div className="h-px flex-1 bg-[var(--gold-dim)]" />
      </div>

      <div className="mx-auto max-w-[1100px] px-6 pb-20 sm:px-10 md:px-16 md:pb-24 lg:px-[72px]">
        <p className="mx-auto mb-12 max-w-[560px] text-center text-[13px] font-normal leading-[1.9] text-[rgba(242,237,227,0.85)] md:text-[14px]">
          A small selection of recent commissions across the United States. Specific project
          references available to qualified trade accounts on inquiry.
        </p>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3">
          {PLACEMENTS.map((p) => (
            <div key={`${p.city}-${p.year}`} className="text-center">
              <div className="mb-2 font-[family-name:var(--font-cormorant)] text-[26px] font-normal leading-none text-[var(--cream)] md:text-[28px]">
                {p.city}
              </div>
              <div className="text-[10px] font-normal uppercase tracking-[0.2em] text-[rgba(242,237,227,0.65)]">
                {p.project} · {p.year}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
