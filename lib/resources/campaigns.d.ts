import { HttpClient } from '../client';
export interface CreateCampaignOptions {
    name: string;
    subject: string;
    /** Sender email address */
    from: string;
    fromName?: string;
    html?: string;
    text?: string;
    templateId?: string;
    recipients?: Array<string | {
        email?: string;
        toEmail?: string;
        address?: string;
    }>;
    /** Send immediately after creation */
    sendImmediately?: boolean;
    tags?: string[];
    replyTo?: string;
    trackOpens?: boolean;
    trackClicks?: boolean;
}
export interface UpdateCampaignOptions {
    name?: string;
    subject?: string;
    from?: string;
    fromName?: string;
    html?: string;
    text?: string;
    preheader?: string;
    scheduledAt?: string | Date;
    tags?: string[];
    recipients?: string[];
}
export interface ListCampaignsOptions {
    page?: number;
    limit?: number;
}
export declare class Campaigns {
    private http;
    constructor(http: HttpClient);
    /**
     * Create a new campaign (draft by default).
     * @example
     * const { campaign } = await client.campaigns.create({ name: 'Launch', subject: 'We're live!', from: 'hi@app.com', html: '...' })
     */
    create(options: CreateCampaignOptions): Promise<unknown>;
    /** List all campaigns. */
    list(options?: ListCampaignsOptions): Promise<unknown>;
    /** Get a single campaign by ID. */
    get(campaignId: string): Promise<unknown>;
    /**
     * Update a draft campaign.
     * Only draft campaigns can be edited.
     */
    update(campaignId: string, options: UpdateCampaignOptions): Promise<unknown>;
    /**
     * Send a campaign to all its recipients.
     * @example
     * await client.campaigns.send('campaign_id')
     */
    send(campaignId: string): Promise<unknown>;
    /** Delete (soft-delete) a campaign. */
    delete(campaignId: string): Promise<unknown>;
    /** Get analytics for a specific campaign. */
    analytics(campaignId: string): Promise<unknown>;
}
