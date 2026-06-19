// Best-effort feed of trade events to the BUD dashboard
// (app.bernardourbina.com). The dashboard owns all storage; bud-trade just
// sends events. Never throws — a dashboard outage must not break inquiries.

// Ingest endpoint. INGEST_URL may be the base host or the full path — we
// normalize either to the full …/api/trade/ingest endpoint.
const INGEST_PATH = '/api/trade/ingest';
const ingestBase = (process.env.INGEST_URL ?? 'https://app.bernardourbina.com').replace(/\/+$/, '');
const INGEST_ENDPOINT = ingestBase.endsWith(INGEST_PATH)
  ? ingestBase
  : `${ingestBase}${INGEST_PATH}`;

type TradeEvent =
  | {
      type: 'inquiry';
      extRef: string;
      firstName: string;
      lastName: string;
      firm: string;
      email: string;
      slab?: string | null;
      context?: string | null;
    }
  | { type: 'open'; extRef: string };

export async function postTradeEvent(event: TradeEvent): Promise<void> {
  const key = process.env.INGEST_API_KEY;
  if (!key) return; // not configured yet → skip silently
  try {
    await fetch(INGEST_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-KEY': key },
      body: JSON.stringify(event),
    });
  } catch (err) {
    console.error('[trade-ingest] failed', err);
  }
}
