'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Intro } from '@/components/Intro';
import { About } from '@/components/About';
import { Process } from '@/components/Process';
import { SectionLabel } from '@/components/SectionLabel';
import { Collection } from '@/components/Collection';
import { Placements } from '@/components/Placements';
import { TradeProgram } from '@/components/TradeProgram';
import { InquiryForm } from '@/components/InquiryForm';
import { Footer } from '@/components/Footer';
import { MobileStickyCTA } from '@/components/MobileStickyCTA';

export default function Page() {
  const [selectedSlab, setSelectedSlab] = useState('');

  const handleInquire = (slab: string) => {
    setSelectedSlab(slab);
    const el = document.getElementById('inquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="flex-1">
      <Header />
      <Hero />
      <Intro />
      <About />
      <Process />
      <SectionLabel id="collection">The Collection</SectionLabel>
      <Collection onInquire={handleInquire} />
      <Placements />
      <SectionLabel id="trade">Trade Program</SectionLabel>
      <TradeProgram />
      <InquiryForm selectedSlab={selectedSlab} onSlabChange={setSelectedSlab} />
      <Footer />
      <MobileStickyCTA />
    </main>
  );
}
