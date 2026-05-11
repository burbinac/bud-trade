export function SectionLabel({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <div
      id={id}
      className="mx-auto flex max-w-[1440px] items-center gap-5 px-6 pb-10 pt-16 sm:px-10 md:px-16 md:pb-10 md:pt-20 lg:px-[72px]"
    >
      <div className="h-px flex-1 bg-[var(--gold-dim)]" />
      <span className="text-[9px] font-normal uppercase tracking-[0.3em] text-[var(--gold)]">
        {children}
      </span>
      <div className="h-px flex-1 bg-[var(--gold-dim)]" />
    </div>
  );
}
