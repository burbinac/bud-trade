type Project = {
  name: string;
  city: string;
  country: string;
  detail: string;
};

const PROJECTS: Project[] = [
  {
    name: 'Iron Wood Hotel',
    city: 'Tacloban',
    country: 'Philippines',
    detail: 'Reception desk and chandelier for the lobby.',
  },
  {
    name: 'Tabacón Thermal Resort',
    city: 'La Fortuna',
    country: 'Costa Rica',
    detail: 'Reception desk, lounge chairs, and coffee table for the arrival area.',
  },
  {
    name: 'Hotel Preserve Life',
    city: 'Atlanta',
    country: 'USA',
    detail: 'A 13-foot Guanacaste table with double live-edge drop.',
  },
];

export function Placements() {
  return (
    <section className="border-b border-[var(--gold-dim)]">
      <div className="mx-auto flex max-w-[1440px] items-center gap-5 px-6 pb-10 pt-16 sm:px-10 md:px-16 md:pb-10 md:pt-20 lg:px-[72px]">
        <div className="h-px flex-1 bg-[var(--gold-dim)]" />
        <span className="text-[12px] font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
          Custom Commissions
        </span>
        <div className="h-px flex-1 bg-[var(--gold-dim)]" />
      </div>

      <div className="mx-auto max-w-[1100px] px-6 pb-20 sm:px-10 md:px-16 md:pb-24 lg:px-[72px]">
        <p className="mx-auto mb-12 max-w-[620px] text-center text-[14px] font-normal leading-[1.9] text-[rgba(242,237,227,0.85)] md:text-[15px]">
          Three recent custom commissions for hospitality projects. The collection above is
          the current catalog; bespoke pieces are designed and produced on request.
        </p>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
          {PROJECTS.map((p) => (
            <div key={p.name} className="text-center">
              <div className="mb-2 font-[family-name:var(--font-cormorant)] text-[24px] font-normal leading-[1.15] text-[var(--cream)] md:text-[26px]">
                {p.name}
              </div>
              <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[rgba(242,237,227,0.7)]">
                {p.city}
                <span className="mx-1.5 text-[var(--gold-dim)]">·</span>
                {p.country}
              </div>
              <p className="mx-auto max-w-[280px] font-[family-name:var(--font-cormorant)] text-[15px] font-normal italic leading-[1.5] text-[rgba(242,237,227,0.75)]">
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
