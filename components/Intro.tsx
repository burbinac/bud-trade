export function Intro() {
  return (
    <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 border-b border-[var(--gold-dim)] px-6 py-16 sm:px-10 md:grid-cols-2 md:gap-20 md:px-16 md:py-20 lg:px-[72px]">
      <div>
        <div className="mb-5 text-[9px] font-normal uppercase tracking-[0.3em] text-[var(--gold)]">
          The Story
        </div>
        <h2 className="mb-5 font-[family-name:var(--font-cormorant)] text-[32px] font-normal leading-tight text-[var(--cream)] md:text-[38px]">
          Every slab is a one-of-a-kind object. No two will ever exist.
        </h2>
        <p className="text-[13px] font-normal leading-[1.9] text-[rgba(242,237,227,0.7)]">
          Each piece begins in the rainforests of Costa Rica — old-growth Guanacaste and Monkey
          Pod, harvested under MINAE permit, double kiln-dried to US moisture standards. Designed
          by Bernardo Urbina and finished in Laurens, South Carolina, they arrive white-glove to
          site.
        </p>
      </div>

      <div className="flex flex-col justify-center gap-7">
        <IntroStat n="9" label="One-of-a-kind slabs available now" />
        <IntroStat n="50%" label="Deposit to secure your piece" />
        <IntroStat n="16–20" label="Week lead time, deposit to delivery" />
      </div>
    </section>
  );
}

function IntroStat({ n, label }: { n: string; label: string }) {
  return (
    <div className="border-l border-[var(--gold-dim)] pl-6">
      <div className="font-[family-name:var(--font-cormorant)] text-[44px] font-normal leading-none text-[var(--gold)]">
        {n}
      </div>
      <div className="mt-1.5 text-[8px] font-light uppercase tracking-[0.2em] text-[rgba(242,237,227,0.7)]">
        {label}
      </div>
    </div>
  );
}
