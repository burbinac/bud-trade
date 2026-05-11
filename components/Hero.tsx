export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      <img
        src="https://cdn.shopify.com/s/files/1/0690/6370/4883/files/10-cover-malibu-cliffside-2550x3300.jpg"
        alt="Bernardo Urbina Design table on a Malibu cliffside"
        className="absolute inset-0 h-full w-full object-cover object-[center_55%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,7,5,0.2)_0%,rgba(8,7,5,0)_35%,rgba(8,7,5,0.65)_72%,rgba(8,7,5,0.97)_100%)]" />

      <div className="relative z-10 flex w-full flex-col gap-12 px-6 pb-12 sm:px-10 sm:pb-16 md:flex-row md:items-end md:justify-between md:px-16 md:pb-20 lg:px-[72px]">
        <div className="max-w-2xl">
          <div className="anim-up text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--gold)] [animation-delay:0.4s] sm:text-[12px]">
            Trade Collection — 2026
          </div>
          <h1
            className="anim-up mt-4 font-[family-name:var(--font-cormorant)] text-[clamp(48px,9vw,96px)] font-normal uppercase leading-[0.92] tracking-[0.03em] text-[var(--cream)] [animation-delay:0.6s]"
          >
            One Tree.
            <br />
            One Table.
          </h1>
          <div className="anim-up mt-6 text-[12px] font-light uppercase leading-[1.9] tracking-[0.18em] text-[rgba(242,237,227,0.85)] [animation-delay:0.8s] sm:text-[13px] md:text-[14px]">
            Costa Rican Hardwood &nbsp;·&nbsp; Double Kiln-Dried
            <br />
            Finished in the United States &nbsp;·&nbsp; One of each will ever exist
          </div>
          <div className="anim-up mt-5 font-[family-name:var(--font-cormorant)] text-base font-normal tracking-[0.1em] text-[var(--gold)] [animation-delay:0.9s]">
            Trade pricing on approval
          </div>
          <div className="anim-up mt-8 flex flex-wrap items-center gap-6 [animation-delay:1s]">
            <a
              href="#inquiry"
              className="inline-flex items-center justify-center rounded-full bg-[var(--gold)] px-7 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--ink)] shadow-[0_4px_20px_rgba(196,154,74,0.25)] transition-all duration-200 hover:-translate-y-px hover:bg-[var(--gold-hover)]"
            >
              Request Spec Sheets
            </a>
            <a
              href="#collection"
              className="group inline-flex items-center gap-2 text-[10px] font-normal uppercase tracking-[0.22em] text-[var(--cream)] transition-colors hover:text-[var(--gold)]"
            >
              View Collection
              <span aria-hidden className="transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </div>
        </div>

        <div className="anim-up flex flex-row gap-8 md:flex-col md:items-end md:gap-7 md:pb-1.5 [animation-delay:1s]">
          <Stat n="9" label="One-of-a-kind slabs" />
          <Stat n="WG" label="White-glove delivery" />
          <Stat n="13–15" label="Week production" />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="md:text-right">
      <div className="font-[family-name:var(--font-cormorant)] text-4xl font-normal leading-none text-[var(--gold)] md:text-[42px]">
        {n}
      </div>
      <div className="mt-1 text-[8px] font-light uppercase tracking-[0.2em] text-[rgba(242,237,227,0.7)]">
        {label}
      </div>
    </div>
  );
}
