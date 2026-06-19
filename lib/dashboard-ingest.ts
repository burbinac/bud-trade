// Best-effort feed of trade events to the BUD dashboard
// (app.bernardourbina.com). The dashboard owns all storage; bud-trade just
// sends events. Never throws — a dashboard outage must not break inquiries.

const DASHBOARD_URL = 'https://app.bernardourbina.com';

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
    await fetch(`${DASHBOARD_URL}/api/trade/ingest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-KEY': key },
      body: JSON.stringify(event),
    });
  } catch (err) {
    console.error('[trade-ingest] failed', err);
  }
}
