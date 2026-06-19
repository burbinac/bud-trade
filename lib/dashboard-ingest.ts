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

export type IngestDiag = {
  configured: boolean;
  endpoint: string;
  status?: number;
  body?: string;
  error?: string;
};

export async function postTradeEvent(event: TradeEvent): Promise<IngestDiag> {
  const key = process.env.INGEST_API_KEY;
  if (!key) return { configured: false, endpoint: INGEST_ENDPOINT };
  try {
    const res = await fetch(INGEST_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-KEY': key },
      body: JSON.stringify(event),
    });
    let body = '';
    try {
      body = (await res.text()).slice(0, 200);
    } catch {
      /* ignore */
    }
    return { configured: true, endpoint: INGEST_ENDPOINT, status: res.status, body };
  } catch (err) {
    return { configured: true, endpoint: INGEST_ENDPOINT, error: String(err) };
  }
}
