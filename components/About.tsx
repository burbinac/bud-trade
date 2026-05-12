export function About() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 border-b border-[var(--gold-dim)] px-6 py-20 sm:px-10 md:grid-cols-[5fr_6fr] md:gap-16 md:px-16 md:py-24 lg:px-[72px]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--ink-2)]">
        <img
          src="/bernardo/portrait.png"
          alt="Bernardo Urbina in his design atelier"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center">
        <div className="mb-5 text-[12px] font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
          The Designer
        </div>
        <h2 className="mb-6 font-[family-name:var(--font-cormorant)] text-[clamp(32px,4vw,44px)] font-normal leading-[1.15] text-[var(--cream)]">
          Bernardo Urbina
        </h2>
        <p className="mb-5 text-[14px] font-normal leading-[1.9] text-[rgba(242,237,227,0.85)] md:text-[15px]">
          Bernardo designs one-of-a-kind dining tables from the hardwoods he sources himself —
          old-growth Guanacaste and Monkey Pod from forests near his home in the Guanacaste
          province of Costa Rica.
        </p>
        <p className="text-[14px] font-normal leading-[1.9] text-[rgba(242,237,227,0.85)] md:text-[15px]">
          Each slab is kiln-dried twice to US moisture standards, then hand-finished in Laurens,
          South Carolina. Bernardo oversees every commission from slab selection to delivery, so
          the piece that arrives is the piece he chose.
        </p>
      </div>
    </section>
  );
}
