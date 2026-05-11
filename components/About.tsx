export function About() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 border-b border-[var(--gold-dim)] px-6 py-20 sm:px-10 md:grid-cols-[5fr_6fr] md:gap-16 md:px-16 md:py-24 lg:px-[72px]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--ink-2)]">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-[family-name:var(--font-cormorant)] text-[120px] font-normal text-[rgba(196,154,74,0.18)]">
            BU
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 text-center">
          <p className="text-[8px] font-normal uppercase tracking-[0.22em] text-[rgba(242,237,227,0.45)]">
            Portrait coming soon
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="mb-5 text-[10px] font-normal uppercase tracking-[0.3em] text-[var(--gold)]">
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
          Each slab is double kiln-dried to US moisture standards, then hand-finished in Laurens,
          South Carolina. Bernardo oversees every commission from slab selection to delivery, so
          the piece that arrives is the piece he chose.
        </p>
      </div>
    </section>
  );
}
