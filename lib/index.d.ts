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
export declare class SendCraft {
    readonly emails: Emails;
    readonly campaigns: Campaigns;
    readonly templates: Templates;
    readonly subscribers: Subscribers;
    readonly analytics: Analytics;
    readonly domains: Domains;
    readonly webhooks: Webhooks;
    readonly segments: Segments;
    readonly automation: Automation;
    readonly smtp: Smtp;
    readonly apiKeys: ApiKeys;
    constructor(config: SendCraftConfig);
}
export default SendCraft;
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
