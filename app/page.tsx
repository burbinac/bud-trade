'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Intro } from '@/components/Intro';
import { SectionLabel } from '@/components/SectionLabel';
import { Collection } from '@/components/Collection';
import { TradeProgram } from '@/components/TradeProgram';
import { InquiryForm } from '@/components/InquiryForm';
import { Footer } from '@/components/Footer';

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
      <SectionLabel id="collection">The Collection</SectionLabel>
      <Collection onInquire={handleInquire} />
      <SectionLabel id="trade">Trade Program</SectionLabel>
      <TradeProgram />
      <InquiryForm selectedSlab={selectedSlab} onSlabChange={setSelectedSlab} />
      <Footer />
    </main>
  );
}
