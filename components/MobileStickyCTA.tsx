'use client';

import { useEffect, useState } from 'react';

export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const viewport = window.innerHeight;
      setVisible(window.scrollY > viewport * 0.6 && !atInquirySection());
    };
    const atInquirySection = () => {
      const el = document.getElementById('inquiry');
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.8 && r.bottom > 0;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[var(--gold-dim)] bg-[rgba(8,7,5,0.92)] backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="px-5 py-3">
        <a
          href="#inquiry"
          className="flex w-full items-center justify-center rounded-full bg-[var(--gold)] px-7 py-3.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--ink)] shadow-[0_4px_20px_rgba(196,154,74,0.3)]"
        >
          Request Spec Sheets →
        </a>
      </div>
    </div>
  );
}
