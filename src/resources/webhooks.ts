import { createHmac, timingSafeEqual } from 'crypto';
import { HttpClient } from '../client';

export interface CreateWebhookOptions {
  url: string;
  events: string[];
  name?: string;
}

export interface WebhookEvent {
  type: string;
  messageId: string;
  timestamp: string;
  [key: string]: unknown;
}

export class Webhooks {
  constructor(private http: HttpClient) {}

  /**
   * Register a webhook endpoint.
   * @example
   * await client.webhooks.create({ url: 'https://myapp.com/hooks/email', events: ['email.bounced', 'email.opened'] })
   */
  create(options: CreateWebhookOptions) {
    return this.http.post('/webhooks', options);
  }

  /** List all registered webhooks. */
  list() {
    return this.http.get('/webhooks');
  }

  /** Delete a webhook by ID. */
  delete(webhookId: string) {
    return this.http.delete(`/webhooks/${webhookId}`);
  }

  /**
   * Verify the HMAC-SHA256 signature of an incoming webhook request.
   * Use this in your webhook handler to confirm the request came from SendCraft.
   *
   * @param payload   - Raw request body string (before JSON.parse)
   * @param signature - Value of the `x-sendcraft-signature` header
   * @param secret    - Your webhook signing secret from the SendCraft dashboard
   * @returns `true` if the signature is valid
   *
   * @example — Express
   * app.post('/hooks/sendcraft', express.raw({ type: 'application/json' }), (req, res) => {
   *   const valid = client.webhooks.verify(
   *     req.body.toString(),
   *     req.headers['x-sendcraft-signature'] as string,
   *     process.env.SENDCRAFT_WEBHOOK_SECRET!,
   *   );
   *   if (!valid) return res.sendStatus(401);
   *   const event = JSON.parse(req.body.toString()) as WebhookEvent;
   *   // handle event...
   *   res.sendStatus(200);
   * });
   */
  verify(payload: string, signature: string, secret: string): boolean {
    if (!payload || !signature || !secret) return false;
    const expected = createHmac('sha256', secret).update(payload).digest('hex');
    // Use Node's built-in constant-time comparison — avoids manual loop and
    // the early-exit length check that leaks whether the provided signature
    // is the right length (expected is always 64 hex chars).
    try {
      return timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(signature, 'hex'));
    } catch {
      // Buffer.from() throws if signature is not valid hex; treat as invalid.
      return false;
    }
  }

  /**
   * Parse and type a raw webhook payload string.
   * Throws a descriptive error on malformed JSON rather than an opaque
   * SyntaxError from the runtime.
   * @example
   * const event = client.webhooks.parse(req.body.toString());
   * if (event.type === 'email.bounced') { ... }
   */
  parse(payload: string): WebhookEvent {
    if (typeof payload !== 'string' || payload.length === 0) {
      throw new Error('[sendcraft-sdk] webhooks.parse() received an empty payload');
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(payload);
    } catch {
      throw new Error('[sendcraft-sdk] webhooks.parse() received invalid JSON');
    }
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('[sendcraft-sdk] webhooks.parse() expected a JSON object');
    }
    // Guard against prototype pollution: __proto__ / constructor overrides
    const obj = parsed as Record<string, unknown>;
    if (Object.prototype.hasOwnProperty.call(obj, '__proto__') ||
        Object.prototype.hasOwnProperty.call(obj, 'constructor') ||
        Object.prototype.hasOwnProperty.call(obj, 'prototype')) {
      throw new Error('[sendcraft-sdk] webhooks.parse() rejected payload with forbidden keys');
    }
    return obj as WebhookEvent;
  }
}
