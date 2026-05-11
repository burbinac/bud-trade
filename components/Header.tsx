'use client';

import { useEffect, useState } from 'react';

const NAV = [
  { href: '#collection', label: 'Collection' },
  { href: '#trade', label: 'Trade' },
  { href: '#inquiry', label: 'Inquire' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-[var(--gold-dim)] bg-[rgba(8,7,5,0.85)] backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 sm:h-[72px] sm:px-10 md:px-16 lg:px-[72px]">
        <a href="#" className="flex items-center gap-3" aria-label="Bernardo Urbina Design — home">
          <img
            src="https://cdn.shopify.com/s/files/1/0690/6370/4883/files/Untitled-1.png"
            alt="BUD"
            className="h-7 w-auto sm:h-8"
          />
          <span className="hidden text-[10px] font-normal uppercase tracking-[0.22em] text-[var(--cream)] sm:inline">
            Bernardo Urbina Design
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.slice(0, 2).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[10px] font-normal uppercase tracking-[0.22em] text-[var(--cream)] transition-colors hover:text-[var(--gold)]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#inquiry"
            className="inline-flex items-center justify-center rounded-full bg-[var(--gold)] px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--ink)] shadow-[0_4px_20px_rgba(196,154,74,0.25)] transition-all duration-200 hover:-translate-y-px hover:bg-[var(--gold-hover)]"
          >
            Inquire
          </a>
        </nav>

        <a
          href="#inquiry"
          className="inline-flex items-center justify-center rounded-full bg-[var(--gold)] px-5 py-2 text-[9px] font-medium uppercase tracking-[0.2em] text-[var(--ink)] md:hidden"
        >
          Inquire
        </a>
      </div>
    </header>
  );
}
