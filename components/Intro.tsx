export function Intro() {
  return (
    <section className="mx-auto max-w-[920px] border-b border-[var(--gold-dim)] px-6 py-20 text-center sm:px-10 md:px-16 md:py-24 lg:px-[72px]">
      <div className="mb-5 text-[10px] font-normal uppercase tracking-[0.3em] text-[var(--gold)]">
        The Story
      </div>
      <h2 className="mx-auto mb-7 max-w-[760px] font-[family-name:var(--font-cormorant)] text-[clamp(28px,4.5vw,44px)] font-normal leading-[1.2] text-[var(--cream)]">
        Every slab is a one-of-a-kind object. No two will ever exist.
      </h2>
      <p className="mx-auto max-w-[640px] text-[14px] font-normal leading-[1.9] text-[rgba(242,237,227,0.85)] md:text-[15px]">
        Each piece begins in the rainforests of Costa Rica — old-growth Guanacaste and Monkey Pod,
        harvested under MINAE permit, double kiln-dried to US moisture standards. Designed by
        Bernardo Urbina and finished in Laurens, South Carolina, every table arrives white-glove
        to site.
      </p>
    </section>
  );
}
