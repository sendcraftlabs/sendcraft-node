"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Campaigns = void 0;
class Campaigns {
    constructor(http) {
        this.http = http;
    }
    /**
     * Create a new campaign (draft by default).
     * @example
     * const { campaign } = await client.campaigns.create({ name: 'Launch', subject: 'We're live!', from: 'hi@app.com', html: '...' })
     */
    create(options) {
        return this.http.post('/campaigns', {
            name: options.name,
            subject: options.subject,
            fromEmail: options.from,
            fromName: options.fromName,
            htmlContent: options.html,
            plainTextContent: options.text,
            templateId: options.templateId,
            recipients: options.recipients,
            sendImmediately: options.sendImmediately,
            tags: options.tags,
            replyTo: options.replyTo,
            trackOpens: options.trackOpens,
            trackClicks: options.trackClicks,
        });
    }
    /** List all campaigns. */
    list(options = {}) {
        return this.http.get('/campaigns', options);
    }
    /** Get a single campaign by ID. */
    get(campaignId) {
        return this.http.get(`/campaigns/${campaignId}`);
    }
    /**
     * Update a draft campaign.
     * Only draft campaigns can be edited.
     */
    update(campaignId, options) {
        return this.http.put(`/campaigns/${campaignId}`, {
            name: options.name,
            subject: options.subject,
            fromEmail: options.from,
            fromName: options.fromName,
            htmlContent: options.html,
            textContent: options.text,
            preheader: options.preheader,
            scheduledAt: options.scheduledAt instanceof Date ? options.scheduledAt.toISOString() : options.scheduledAt,
            tags: options.tags,
            recipients: options.recipients,
        });
    }
    /**
     * Send a campaign to all its recipients.
     * @example
     * await client.campaigns.send('campaign_id')
     */
    send(campaignId) {
        return this.http.post(`/campaigns/${campaignId}/send`);
    }
    /** Delete (soft-delete) a campaign. */
    delete(campaignId) {
        return this.http.delete(`/campaigns/${campaignId}`);
    }
    /** Get analytics for a specific campaign. */
    analytics(campaignId) {
        return this.http.get(`/analytics/campaign/${campaignId}`);
    }
}
exports.Campaigns = Campaigns;
