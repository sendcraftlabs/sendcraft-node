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
export declare class Webhooks {
    private http;
    constructor(http: HttpClient);
    /**
     * Register a webhook endpoint.
     * @example
     * await client.webhooks.create({ url: 'https://myapp.com/hooks/email', events: ['email.bounced', 'email.opened'] })
     */
    create(options: CreateWebhookOptions): Promise<unknown>;
    /** List all registered webhooks. */
    list(): Promise<unknown>;
    /** Delete a webhook by ID. */
    delete(webhookId: string): Promise<unknown>;
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
    verify(payload: string, signature: string, secret: string): boolean;
    /**
     * Parse and type a raw webhook payload string.
     * Throws a descriptive error on malformed JSON rather than an opaque
     * SyntaxError from the runtime.
     * @example
     * const event = client.webhooks.parse(req.body.toString());
     * if (event.type === 'email.bounced') { ... }
     */
    parse(payload: string): WebhookEvent;
}
