import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://trade.bernardourbina.com'),
  title: 'Designer Tables — Bernardo Urbina Design',
  description:
    'Nine one-of-a-kind Costa Rican hardwood dining tables. Designed by Bernardo Urbina, finished in the United States, delivered white-glove to site.',
  openGraph: {
    title: 'One Tree. One Table. — Bernardo Urbina Design',
    description:
      'Nine one-of-a-kind Costa Rican hardwood dining tables. Kiln-dried twice, finished in the U.S. Trade pricing on approval.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Bernardo Urbina Design',
    url: 'https://trade.bernardourbina.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'One Tree. One Table. — Bernardo Urbina Design',
    description:
      'Nine one-of-a-kind Costa Rican hardwood dining tables. Trade pricing on approval.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
