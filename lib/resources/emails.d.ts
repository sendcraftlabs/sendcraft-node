import { HttpClient } from '../client';
type ReactElement = {
    type: any;
    props: any;
    key: string | null;
};
export interface SendEmailOptions {
    /** Recipient email address */
    to: string;
    toName?: string;
    subject: string;
    /**
     * Idempotency key — prevents duplicate sends on network retries.
     * Same key + same user within 24h returns the cached response.
     * Pass via X-Idempotency-Key header automatically.
     */
    idempotencyKey?: string;
    /**
     * HTML body string.
     * Mutually exclusive with `react` — provide one or the other.
     */
    html?: string;
    /**
     * React Email component. Requires `@react-email/render` to be installed.
     * @example
     * import WelcomeEmail from './emails/welcome';
     * await client.emails.send({ to: '...', subject: '...', react: <WelcomeEmail name="Alice" /> });
     */
    react?: ReactElement;
    /** Plain-text fallback (auto-generated from HTML if omitted) */
    text?: string;
    from?: string;
    fromName?: string;
    replyTo?: string;
    /** CC recipients */
    cc?: string | string[];
    /** BCC recipients */
    bcc?: string | string[];
}
export interface SendBulkEmailOptions {
    /** Array of email addresses or `{ toEmail, toName }` objects */
    emails: Array<string | {
        toEmail: string;
        toName?: string;
    }>;
    subject: string;
    html?: string;
    react?: ReactElement;
    text?: string;
    from?: string;
    fromName?: string;
}
export interface ScheduleEmailOptions {
    to: string;
    subject: string;
    html?: string;
    react?: ReactElement;
    /** ISO string or Date — when to deliver */
    scheduledAt: string | Date;
    from?: string;
}
export interface ListEmailsOptions {
    page?: number;
    limit?: number;
    status?: 'sent' | 'failed' | 'bounced' | 'pending';
    campaignId?: string;
}
export declare class Emails {
    private http;
    constructor(http: HttpClient);
    /**
     * Send a single transactional email.
     * @example — plain HTML
     * await client.emails.send({ to: 'user@example.com', subject: 'Hi', html: '<p>Hello</p>' })
     *
     * @example — React Email component (requires @react-email/render)
     * await client.emails.send({ to: 'user@example.com', subject: 'Hi', react: <WelcomeEmail /> })
     */
    send(options: SendEmailOptions): Promise<unknown>;
    /**
     * Render a React Email component (or return a plain HTML string) without sending.
     * Useful for previewing templates locally or in tests.
     * @example
     * const html = await client.emails.render({ react: <WelcomeEmail name="Alice" /> });
     * console.log(html); // full HTML string
     */
    render(options: Pick<SendEmailOptions, 'html' | 'react'>): Promise<string>;
    /**
     * Send the same email to multiple recipients.
     * @example
     * await client.emails.sendBulk({ emails: ['a@b.com', 'c@d.com'], subject: 'News', html: '...' })
     */
    sendBulk(options: SendBulkEmailOptions): Promise<unknown>;
    /**
     * Schedule an email for future delivery.
     * @example
     * await client.emails.schedule({ to: '...', subject: '...', html: '...', scheduledAt: '2026-04-01T09:00:00Z' })
     */
    schedule(options: ScheduleEmailOptions): Promise<unknown>;
    /**
     * Send up to 100 distinct emails in a single API call.
     * Each item can have a different to, subject, and html.
     * @example
     * await client.emails.batch([
     *   { to: 'a@example.com', subject: 'Hello A', html: '<p>Hi A</p>' },
     *   { to: 'b@example.com', subject: 'Hello B', html: '<p>Hi B</p>' },
     * ])
     */
    batch(emails: Array<Omit<SendEmailOptions, 'idempotencyKey'>>, idempotencyKey?: string): Promise<unknown>;
    /** Get a single email by ID. */
    get(id: string): Promise<unknown>;
    /** Update the scheduled delivery time of a scheduled email. */
    updateSchedule(id: string, scheduledAt: string | Date): Promise<unknown>;
    /** Cancel a scheduled email before it is sent. */
    cancelSchedule(id: string): Promise<unknown>;
    /** List sent emails with optional filters. */
    list(options?: ListEmailsOptions): Promise<unknown>;
    /** Get account-level email stats (open rate, click rate, etc.). */
    stats(): Promise<unknown>;
}
export {};
