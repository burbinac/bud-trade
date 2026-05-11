type Project = {
  name: string;
  city: string;
  country: string;
};

const PROJECTS: Project[] = [
  { name: 'Iron Wood Hotel', city: 'Tacloban', country: 'Philippines' },
  { name: 'Tabacón Thermal Resort', city: 'La Fortuna', country: 'Costa Rica' },
  { name: 'Hotel Preserve Life', city: 'Atlanta', country: 'USA' },
];

export function Placements() {
  return (
    <section className="border-b border-[var(--gold-dim)]">
      <div className="mx-auto flex max-w-[1440px] items-center gap-5 px-6 pb-10 pt-16 sm:px-10 md:px-16 md:pb-10 md:pt-20 lg:px-[72px]">
        <div className="h-px flex-1 bg-[var(--gold-dim)]" />
        <span className="text-[12px] font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
          Bernardo&apos;s Projects
        </span>
        <div className="h-px flex-1 bg-[var(--gold-dim)]" />
      </div>

      <div className="mx-auto max-w-[1100px] px-6 pb-20 sm:px-10 md:px-16 md:pb-24 lg:px-[72px]">
        <p className="mx-auto mb-12 max-w-[560px] text-center text-[13px] font-normal leading-[1.9] text-[rgba(242,237,227,0.85)] md:text-[14px]">
          A small selection of hospitality projects featuring work by Bernardo Urbina. Specific
          references available to qualified trade accounts on inquiry.
        </p>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3">
          {PROJECTS.map((p) => (
            <div key={p.name} className="text-center">
              <div className="mb-2 font-[family-name:var(--font-cormorant)] text-[24px] font-normal leading-[1.15] text-[var(--cream)] md:text-[26px]">
                {p.name}
              </div>
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[rgba(242,237,227,0.7)]">
                {p.city}
                <span className="mx-1.5 text-[var(--gold-dim)]">·</span>
                {p.country}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
