import crypto from 'node:crypto';

// The catalog lives at an unguessable path and is noindex'd. It's served
// directly (raw file) and embedded by the tracked /c/<token> wrapper.
export const CATALOG_FILE = '/trade-collection-2026-u7m3k9qx.html';

export type LeadPayload = {
  firstName: string;
  lastName: string;
  firm: string;
  email: string;
  slab: string;
  extRef: string;
};

// Derive a 32-byte key from the Resend key so we don't need a separate secret.
function getKey(): Buffer | null {
  const secret = process.env.RESEND_API_KEY;
  if (!secret) return null;
  return crypto.createHash('sha256').update(secret).digest();
}

// AES-256-GCM: opaque (no readable PII in the URL) and tamper-proof.
export function signCatalogToken(payload: LeadPayload): string | null {
  const key = getKey();
  if (!key) return null;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const data = Buffer.concat([cipher.update(JSON.stringify(payload), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, data]).toString('base64url');
}

export function verifyCatalogToken(token: string): LeadPayload | null {
  const key = getKey();
  if (!key) return null;
  try {
    const raw = Buffer.from(token, 'base64url');
    const iv = raw.subarray(0, 12);
    const tag = raw.subarray(12, 28);
    const data = raw.subarray(28);
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    const out = Buffer.concat([decipher.update(data), decipher.final()]);
    return JSON.parse(out.toString('utf8')) as LeadPayload;
  } catch {
    return null;
  }
}
