"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendCraft = void 0;
const client_1 = require("./client");
const emails_1 = require("./resources/emails");
const campaigns_1 = require("./resources/campaigns");
const templates_1 = require("./resources/templates");
const subscribers_1 = require("./resources/subscribers");
const analytics_1 = require("./resources/analytics");
const domains_1 = require("./resources/domains");
const webhooks_1 = require("./resources/webhooks");
const segments_1 = require("./resources/segments");
const automation_1 = require("./resources/automation");
const smtp_1 = require("./resources/smtp");
const apiKeys_1 = require("./resources/apiKeys");
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
class SendCraft {
    constructor(config) {
        if (!config.apiKey || typeof config.apiKey !== 'string') {
            throw new Error('SendCraft: apiKey is required and must be a non-empty string');
        }
        if (config.apiKey.trim() !== config.apiKey) {
            throw new Error('SendCraft: apiKey must not contain leading or trailing whitespace');
        }
        if (config.apiKey.length < 16) {
            throw new Error('SendCraft: apiKey appears invalid — must be at least 16 characters');
        }
        const http = new client_1.HttpClient(config.apiKey, (config.baseUrl ?? 'https://api.sendcraft.online/api').replace(/\/$/, ''));
        this.emails = new emails_1.Emails(http);
        this.campaigns = new campaigns_1.Campaigns(http);
        this.templates = new templates_1.Templates(http);
        this.subscribers = new subscribers_1.Subscribers(http);
        this.analytics = new analytics_1.Analytics(http);
        this.domains = new domains_1.Domains(http);
        this.webhooks = new webhooks_1.Webhooks(http);
        this.segments = new segments_1.Segments(http);
        this.automation = new automation_1.Automation(http);
        this.smtp = new smtp_1.Smtp(http);
        this.apiKeys = new apiKeys_1.ApiKeys(http);
    }
}
exports.SendCraft = SendCraft;
// Named + default export so both work:
// import SendCraft from 'sendcraft-sdk'
// import { SendCraft } from 'sendcraft-sdk'
exports.default = SendCraft;
// Re-export all types
__exportStar(require("./resources/emails"), exports);
__exportStar(require("./resources/campaigns"), exports);
__exportStar(require("./resources/templates"), exports);
__exportStar(require("./resources/subscribers"), exports);
__exportStar(require("./resources/domains"), exports);
__exportStar(require("./resources/webhooks"), exports);
__exportStar(require("./resources/segments"), exports);
__exportStar(require("./resources/automation"), exports);
__exportStar(require("./resources/smtp"), exports);
__exportStar(require("./resources/apiKeys"), exports);
__exportStar(require("./error"), exports);
