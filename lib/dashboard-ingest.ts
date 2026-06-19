// Best-effort feed of trade events to the BUD dashboard
// (app.bernardourbina.com). The dashboard owns all storage; bud-trade just
// sends events. Never throws — a dashboard outage must not break inquiries.

// Ingest endpoint. We only trust the HOST of INGEST_URL and always use the
// correct /api/trade/ingest path — so even if INGEST_URL points at a different
// route (e.g. the facturas ingest), we still hit the right trade endpoint.
const INGEST_PATH = '/api/trade/ingest';
function resolveIngestEndpoint(): string {
  const fallbackOrigin = 'https://app.bernardourbina.com';
  const raw = process.env.INGEST_URL;
  if (!raw) return fallbackOrigin + INGEST_PATH;
  try {
    return new URL(raw).origin + INGEST_PATH;
  } catch {
    return fallbackOrigin + INGEST_PATH;
  }
}
const INGEST_ENDPOINT = resolveIngestEndpoint();

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
