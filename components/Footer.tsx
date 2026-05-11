export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-[var(--gold-dim)] bg-[var(--ink-2)] px-6 py-8 sm:flex-row sm:px-10 md:px-16 lg:px-[72px]">
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-light uppercase tracking-[0.2em] text-[rgba(242,237,227,0.7)]">
          Bernardo Urbina Design
        </span>
      </div>
      <div className="text-center text-[9px] font-extralight uppercase tracking-[0.14em] text-[rgba(242,237,227,0.7)] sm:text-right">
        trade@bernardourbina.com &nbsp;·&nbsp; bernardourbina.com &nbsp;·&nbsp; © 2026
      </div>
    </footer>
  );
}
