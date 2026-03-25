"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emails = void 0;
/**
 * Render a React Email component to an HTML string.
 * Throws if `@react-email/render` is not installed.
 */
async function renderReact(element) {
    let render;
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const mod = require('@react-email/render');
        render = mod.render ?? mod.default?.render;
        if (typeof render !== 'function') {
            throw new Error('@react-email/render does not export a `render` function — check the installed version');
        }
    }
    catch (err) {
        // Re-throw a helpful install message, but chain the root cause so
        // callers can inspect it (e.g. module-not-found vs wrong-version).
        const cause = err instanceof Error ? err.message : String(err);
        throw new Error('[sendcraft-sdk] The `react` option requires @react-email/render.\n' +
            'Install it: npm install @react-email/render react react-dom\n' +
            `Root cause: ${cause}`);
    }
    return render(element);
}
class Emails {
    constructor(http) {
        this.http = http;
    }
    /**
     * Send a single transactional email.
     * @example — plain HTML
     * await client.emails.send({ to: 'user@example.com', subject: 'Hi', html: '<p>Hello</p>' })
     *
     * @example — React Email component (requires @react-email/render)
     * await client.emails.send({ to: 'user@example.com', subject: 'Hi', react: <WelcomeEmail /> })
     */
    async send(options) {
        const html = options.react ? await renderReact(options.react) : options.html;
        if (!html)
            throw new Error('[sendcraft-sdk] Provide either `html` or `react` in send()');
        return this.http.post('/emails/send', {
            toEmail: options.to,
            toName: options.toName,
            subject: options.subject,
            htmlContent: html,
            plainTextContent: options.text,
            fromEmail: options.from,
            fromName: options.fromName,
            replyTo: options.replyTo,
            cc: options.cc,
            bcc: options.bcc,
        }, options.idempotencyKey ? { 'X-Idempotency-Key': options.idempotencyKey } : undefined);
    }
    /**
     * Render a React Email component (or return a plain HTML string) without sending.
     * Useful for previewing templates locally or in tests.
     * @example
     * const html = await client.emails.render({ react: <WelcomeEmail name="Alice" /> });
     * console.log(html); // full HTML string
     */
    async render(options) {
        if (options.react)
            return renderReact(options.react);
        if (options.html)
            return options.html;
        throw new Error('[sendcraft-sdk] Provide either `html` or `react` in render()');
    }
    /**
     * Send the same email to multiple recipients.
     * @example
     * await client.emails.sendBulk({ emails: ['a@b.com', 'c@d.com'], subject: 'News', html: '...' })
     */
    async sendBulk(options) {
        const html = options.react ? await renderReact(options.react) : options.html;
        if (!html)
            throw new Error('[sendcraft-sdk] Provide either `html` or `react` in sendBulk()');
        return this.http.post('/emails/send-bulk', {
            emails: options.emails,
            subject: options.subject,
            htmlContent: html,
            plainTextContent: options.text,
            fromEmail: options.from,
            fromName: options.fromName,
        });
    }
    /**
     * Schedule an email for future delivery.
     * @example
     * await client.emails.schedule({ to: '...', subject: '...', html: '...', scheduledAt: '2026-04-01T09:00:00Z' })
     */
    async schedule(options) {
        const html = options.react ? await renderReact(options.react) : options.html;
        if (!html)
            throw new Error('[sendcraft-sdk] Provide either `html` or `react` in schedule()');
        return this.http.post('/emails/schedule', {
            toEmail: options.to,
            subject: options.subject,
            htmlContent: html,
            fromEmail: options.from,
            scheduledTime: options.scheduledAt instanceof Date
                ? options.scheduledAt.toISOString()
                : options.scheduledAt,
        });
    }
    /**
     * Send up to 100 distinct emails in a single API call.
     * Each item can have a different to, subject, and html.
     * @example
     * await client.emails.batch([
     *   { to: 'a@example.com', subject: 'Hello A', html: '<p>Hi A</p>' },
     *   { to: 'b@example.com', subject: 'Hello B', html: '<p>Hi B</p>' },
     * ])
     */
    async batch(emails, idempotencyKey) {
        const rendered = await Promise.all(emails.map(async (e) => {
            const html = e.react ? await renderReact(e.react) : e.html;
            if (!html)
                throw new Error('[sendcraft-sdk] Each email in batch() must have `html` or `react`');
            return {
                toEmail: e.to,
                toName: e.toName,
                subject: e.subject,
                htmlContent: html,
                plainTextContent: e.text,
                fromEmail: e.from,
                fromName: e.fromName,
                replyTo: e.replyTo,
            };
        }));
        return this.http.post('/emails/batch', { emails: rendered }, idempotencyKey ? { 'X-Idempotency-Key': idempotencyKey } : undefined);
    }
    /** Get a single email by ID. */
    get(id) {
        return this.http.get(`/emails/${id}`);
    }
    /** Update the scheduled delivery time of a scheduled email. */
    updateSchedule(id, scheduledAt) {
        return this.http.patch(`/emails/${id}/schedule`, {
            scheduledTime: scheduledAt instanceof Date ? scheduledAt.toISOString() : scheduledAt,
        });
    }
    /** Cancel a scheduled email before it is sent. */
    cancelSchedule(id) {
        return this.http.delete(`/emails/${id}/schedule`);
    }
    /** List sent emails with optional filters. */
    list(options = {}) {
        return this.http.get('/emails', options);
    }
    /** Get account-level email stats (open rate, click rate, etc.). */
    stats() {
        return this.http.get('/emails/stats/summary');
    }
}
exports.Emails = Emails;
