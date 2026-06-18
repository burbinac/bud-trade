import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt =
  'One Tree. One Table. — a Bernardo Urbina live-edge slab dining table on a Malibu cliffside at sunset.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const HERO =
  'https://cdn.shopify.com/s/files/1/0690/6370/4883/files/10-cover-malibu-cliffside-2550x3300.jpg';

async function loadCormorant(): Promise<ArrayBuffer> {
  const css = await fetch(
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500',
  ).then((res) => res.text());
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error('Could not resolve Cormorant Garamond font URL');
  return fetch(url).then((res) => res.arrayBuffer());
}

export default async function Image() {
  const [cormorant, heroBytes, markBytes] = await Promise.all([
    loadCormorant(),
    fetch(HERO).then((res) => res.arrayBuffer()),
    readFile(join(process.cwd(), 'public/bud-mark-white.png')),
  ]);
  const heroSrc = `data:image/jpeg;base64,${Buffer.from(heroBytes).toString('base64')}`;
  const markSrc = `data:image/png;base64,${Buffer.from(markBytes).toString('base64')}`;

  return new ImageResponse(
    (
      <div style={{ position: 'relative', display: 'flex', width: '100%', height: '100%' }}>
        <img
          src={heroSrc}
          width={1200}
          height={630}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            objectFit: 'cover',
            objectPosition: 'center 55%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: 'flex',
            backgroundImage:
              'linear-gradient(to top, rgba(8,7,5,0.9) 0%, rgba(8,7,5,0.2) 46%, rgba(8,7,5,0) 72%)',
          }}
        />
        <img
          src={markSrc}
          width={96}
          height={96}
          style={{ position: 'absolute', right: 64, bottom: 56 }}
        />
        <div
          style={{
            position: 'absolute',
            left: 72,
            bottom: 64,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Cormorant',
            fontWeight: 500,
            textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex', fontSize: 96, lineHeight: 1, letterSpacing: '3px', color: '#F2EDE3' }}>
            One Tree.
          </div>
          <div style={{ display: 'flex', fontSize: 96, lineHeight: 1, letterSpacing: '3px', color: '#F2EDE3' }}>
            One Table.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Cormorant', data: cormorant, style: 'normal', weight: 500 }],
    },
  );
}
