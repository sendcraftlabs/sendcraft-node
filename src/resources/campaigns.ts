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
  recipients?: Array<string | { email?: string; toEmail?: string; address?: string }>;
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

export class Campaigns {
  constructor(private http: HttpClient) {}

  /**
   * Create a new campaign (draft by default).
   * @example
   * const { campaign } = await client.campaigns.create({ name: 'Launch', subject: 'We're live!', from: 'hi@app.com', html: '...' })
   */
  create(options: CreateCampaignOptions) {
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
  list(options: ListCampaignsOptions = {}) {
    return this.http.get('/campaigns', options as Record<string, unknown>);
  }

  /** Get a single campaign by ID. */
  get(campaignId: string) {
    return this.http.get(`/campaigns/${campaignId}`);
  }

  /**
   * Update a draft campaign.
   * Only draft campaigns can be edited.
   */
  update(campaignId: string, options: UpdateCampaignOptions) {
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
  send(campaignId: string) {
    return this.http.post(`/campaigns/${campaignId}/send`);
  }

  /** Delete (soft-delete) a campaign. */
  delete(campaignId: string) {
    return this.http.delete(`/campaigns/${campaignId}`);
  }

  /** Get analytics for a specific campaign. */
  analytics(campaignId: string) {
    return this.http.get(`/analytics/campaign/${campaignId}`);
  }
}
