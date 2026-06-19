import type { MetadataRoute } from 'next';

// The site is crawlable, but the trade catalog and its tracked links are not —
// they're "for trade use only" and reach people via the inquiry auto-reply.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/c/', '/trade-collection-2026-u7m3k9qx.html'],
    },
  };
}
