import { HttpClient } from './client';
import { Emails } from './resources/emails';
import { Campaigns } from './resources/campaigns';
import { Templates } from './resources/templates';
import { Subscribers } from './resources/subscribers';
import { Analytics } from './resources/analytics';
import { Domains } from './resources/domains';
import { Webhooks } from './resources/webhooks';
import { Segments } from './resources/segments';
import { Automation } from './resources/automation';
import { Smtp } from './resources/smtp';
import { ApiKeys } from './resources/apiKeys';

export interface SendCraftConfig {
  apiKey: string;
  baseUrl?: string;
}

/**
 * SendCraft SDK
 *
 * @example
 * import { SendCraft } from 'sendcraft-sdk'
 *
 * const client = new SendCraft({ apiKey: 'sc_live_...' })
 *
 * // Send a transactional email
 * await client.emails.send({ to: 'user@example.com', subject: 'Hello', html: '<p>Hi!</p>' })
 *
 * // Create and send a campaign
 * const { campaign } = await client.campaigns.create({ name: 'Launch', subject: 'We are live!', from: 'hi@app.com', html: '...' })
 * await client.campaigns.send(campaign._id)
 *
 * // Get SMTP relay credentials
 * const { smtp } = await client.smtp.credentials()
 *
 * // Check IP warmup status
 * const { warmup } = await client.smtp.warmupStatus()
 *
 * // List segments
 * const { segments } = await client.segments.list()
 *
 * // Activate an automation
 * await client.automation.activate('automation_id')
 */
export class SendCraft {
  readonly emails:      Emails;
  readonly campaigns:   Campaigns;
  readonly templates:   Templates;
  readonly subscribers: Subscribers;
  readonly analytics:   Analytics;
  readonly domains:     Domains;
  readonly webhooks:    Webhooks;
  readonly segments:    Segments;
  readonly automation:  Automation;
  readonly smtp:        Smtp;
  readonly apiKeys:     ApiKeys;

  constructor(config: SendCraftConfig) {
    if (!config.apiKey || typeof config.apiKey !== 'string') {
      throw new Error('SendCraft: apiKey is required and must be a non-empty string');
    }
    if (config.apiKey.trim() !== config.apiKey) {
      throw new Error('SendCraft: apiKey must not contain leading or trailing whitespace');
    }
    if (config.apiKey.length < 16) {
      throw new Error('SendCraft: apiKey appears invalid — must be at least 16 characters');
    }

    const http = new HttpClient(
      config.apiKey,
      (config.baseUrl ?? 'https://api.sendcraft.online/api').replace(/\/$/, '')
    );

    this.emails      = new Emails(http);
    this.campaigns   = new Campaigns(http);
    this.templates   = new Templates(http);
    this.subscribers = new Subscribers(http);
    this.analytics   = new Analytics(http);
    this.domains     = new Domains(http);
    this.webhooks    = new Webhooks(http);
    this.segments    = new Segments(http);
    this.automation  = new Automation(http);
    this.smtp        = new Smtp(http);
    this.apiKeys     = new ApiKeys(http);
  }
}

// Named + default export so both work:
// import SendCraft from 'sendcraft-sdk'
// import { SendCraft } from 'sendcraft-sdk'
export default SendCraft;

// Re-export all types
export * from './resources/emails';
export * from './resources/campaigns';
export * from './resources/templates';
export * from './resources/subscribers';
export * from './resources/domains';
export * from './resources/webhooks';
export * from './resources/segments';
export * from './resources/automation';
export * from './resources/smtp';
export * from './resources/apiKeys';
export * from './error';
