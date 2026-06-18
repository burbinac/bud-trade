type PressItem = {
  outlet: string;
  logo: string;
  /** Tailwind height class — tuned per logo so optical weight matches across the row. */
  logoClass: string;
  cta: string;
  href: string;
};

const PRESS: PressItem[] = [
  {
    outlet: 'Woodpreneur',
    logo: '/Press/Wood-prenuer.avif',
    logoClass: 'h-12 md:h-14',
    cta: 'Listen to podcast',
    href: 'https://pod.co/the-woodpreneur-podcast-1/bernardo-urbina-costa-rica-mil',
  },
  {
    outlet: 'The New York Times',
    logo: '/Press/NYT_logo2.avif',
    logoClass: 'h-14 md:h-16',
    cta: 'Watch the feature',
    href: 'https://www.nytimes.com/video/multimedia/100000003214365/typhoon-debris-turned-into-furniture.html?playlistId=1194811622186',
  },
  {
    outlet: 'Reuters',
    logo: '/Press/reuters_logo_2.1.webp',
    logoClass: 'h-12 md:h-14',
    cta: 'Read the article',
    href: 'https://www.reuters.com/article/philippines-haiyan-furniture-idINKBN0IQ0ZO20141106/',
  },
];

export function Press() {
  return (
    <section className="border-b border-[var(--gold-dim)]">
      <div className="mx-auto flex max-w-[1440px] items-center gap-5 px-6 pb-10 pt-16 sm:px-10 md:px-16 md:pb-10 md:pt-20 lg:px-[72px]">
        <div className="h-px flex-1 bg-[var(--gold-dim)]" />
        <span className="text-[12px] font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
          In the Press
        </span>
        <div className="h-px flex-1 bg-[var(--gold-dim)]" />
      </div>

      <div className="mx-auto max-w-[1100px] px-6 pb-20 sm:px-10 md:px-16 md:pb-24 lg:px-[72px]">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3">
          {PRESS.map((item) => (
            <a
              key={item.outlet}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center"
            >
              <div className="mb-6 flex h-16 items-center justify-center">
                <img
                  src={item.logo}
                  alt={`${item.outlet} logo`}
                  className={`w-auto object-contain opacity-65 brightness-0 invert transition-opacity duration-300 group-hover:opacity-100 ${item.logoClass}`}
                />
              </div>
              <div className="mb-2 text-[15px] font-medium text-[var(--cream)] md:text-[16px]">
                {item.outlet}
              </div>
              <span className="text-[13px] font-normal text-[rgba(242,237,227,0.7)] underline decoration-[var(--gold-dim)] underline-offset-4 transition-colors duration-300 group-hover:text-[var(--gold)] group-hover:decoration-[var(--gold)]">
                {item.cta}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
