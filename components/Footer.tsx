export function Footer() {
  return (
    <footer className="border-t border-[var(--gold-dim)] bg-[var(--ink-2)]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 py-14 sm:px-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12 md:px-16 lg:px-[72px]">
        <div>
          <img
            src="https://cdn.shopify.com/s/files/1/0690/6370/4883/files/Untitled-1.png"
            alt="BUD"
            className="mb-4 h-7 w-auto"
          />
          <div className="mb-3 text-[10px] font-normal uppercase tracking-[0.22em] text-[var(--cream)]">
            Bernardo Urbina Design
          </div>
          <p className="max-w-[260px] text-[12px] font-normal leading-[1.8] text-[rgba(242,237,227,0.7)]">
            One-of-a-kind dining tables in Costa Rican hardwood, finished in Laurens, South
            Carolina.
          </p>
        </div>

        <div>
          <div className="mb-4 text-[9px] font-normal uppercase tracking-[0.22em] text-[var(--gold)]">
            Trade
          </div>
          <ul className="flex flex-col gap-2.5 text-[12px] font-normal text-[rgba(242,237,227,0.85)]">
            <li>
              <a href="#collection" className="transition-colors hover:text-[var(--gold)]">
                The Collection
              </a>
            </li>
            <li>
              <a href="#trade" className="transition-colors hover:text-[var(--gold)]">
                Trade Program
              </a>
            </li>
            <li>
              <a href="#inquiry" className="transition-colors hover:text-[var(--gold)]">
                Request Spec Sheets
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-4 text-[9px] font-normal uppercase tracking-[0.22em] text-[var(--gold)]">
            Contact
          </div>
          <ul className="flex flex-col gap-2.5 text-[12px] font-normal text-[rgba(242,237,227,0.85)]">
            <li>
              <a
                href="mailto:trade@bernardourbina.com"
                className="transition-colors hover:text-[var(--gold)]"
              >
                trade@bernardourbina.com
              </a>
            </li>
            <li>
              <a
                href="https://bernardourbina.com"
                className="transition-colors hover:text-[var(--gold)]"
              >
                bernardourbina.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-4 text-[9px] font-normal uppercase tracking-[0.22em] text-[var(--gold)]">
            Studios
          </div>
          <ul className="flex flex-col gap-2.5 text-[12px] font-normal text-[rgba(242,237,227,0.85)]">
            <li>Guanacaste, Costa Rica</li>
            <li>Laurens, South Carolina</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--gold-dim)]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row sm:px-10 md:px-16 lg:px-[72px]">
          <div className="text-[9px] font-light uppercase tracking-[0.18em] text-[rgba(242,237,227,0.55)]">
            © 2026 Bernardo Urbina Design
          </div>
          <div className="text-[9px] font-light uppercase tracking-[0.18em] text-[rgba(242,237,227,0.55)]">
            CAFTA-DR Duty-Free · MINAE Permit Harvest
          </div>
        </div>
      </div>
    </footer>
  );
}
