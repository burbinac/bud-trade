type PressItem = {
  outlet: string;
  logo: string;
  /** Per-logo height so optical weight matches across the row. */
  logoClass: string;
  cta: string;
  href: string;
};

const PRESS: PressItem[] = [
  {
    outlet: 'Woodpreneur',
    logo: '/Press/Wood-prenuer.avif',
    logoClass: 'h-7',
    cta: 'Listen to podcast',
    href: 'https://pod.co/the-woodpreneur-podcast-1/bernardo-urbina-costa-rica-mil',
  },
  {
    outlet: 'The New York Times',
    logo: '/Press/NYT_logo2.avif',
    logoClass: 'h-8',
    cta: 'Watch the feature',
    href: 'https://www.nytimes.com/video/multimedia/100000003214365/typhoon-debris-turned-into-furniture.html?playlistId=1194811622186',
  },
  {
    outlet: 'Reuters',
    logo: '/Press/reuters_logo_2.1.webp',
    logoClass: 'h-7',
    cta: 'Read the article',
    href: 'https://www.reuters.com/article/philippines-haiyan-furniture-idINKBN0IQ0ZO20141106/',
  },
];

export function About() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 border-b border-[var(--gold-dim)] px-6 py-20 sm:px-10 md:grid-cols-[5fr_6fr] md:gap-16 md:px-16 md:py-24 lg:px-[72px]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--ink-2)]">
        <img
          src="/bernardo/Bernardo_wall.png"
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
          Bernardo spent five years in New York — studying furniture design at Pratt
          Institute, then working in SoHo studios. He moved to Milan to earn his
          Master&apos;s at Politecnico di Milano, then worked on exhibition design in the
          city — including Moooi installations during Salone del Mobile and projects for
          the Triennale di Milano. After three years in the Philippines — where he founded
          his first furniture brand and was featured in <em>The New York Times</em> — he
          returned home to Costa Rica.
        </p>
        <p className="text-[14px] font-normal leading-[1.9] text-[rgba(242,237,227,0.85)] md:text-[15px]">
          Today he works between a mill in rural Guanacaste and a finishing studio in South
          Carolina. Every piece is sourced, designed, and overseen by Bernardo from a
          farmer&apos;s tree to a designer&apos;s spec sheet — the table that arrives is the
          table he chose.
        </p>

        <div className="mt-12 border-t border-[var(--gold-dim)] pt-8">
          <div className="mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
            Featured In
          </div>
          <div className="flex flex-wrap items-start gap-x-10 gap-y-6">
            {PRESS.map((item) => (
              <a
                key={item.outlet}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-start gap-3"
              >
                <span className="flex h-8 items-center">
                  <img
                    src={item.logo}
                    alt={`${item.outlet} logo`}
                    className={`w-auto object-contain opacity-60 brightness-0 invert transition-opacity duration-300 group-hover:opacity-100 ${item.logoClass}`}
                  />
                </span>
                <span className="text-[12px] text-[rgba(242,237,227,0.65)] underline decoration-[var(--gold-dim)] underline-offset-4 transition-colors duration-300 group-hover:text-[var(--gold)] group-hover:decoration-[var(--gold)]">
                  {item.cta}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
