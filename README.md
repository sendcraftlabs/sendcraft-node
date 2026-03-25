# sendcraft-sdk

<p align="center">
  <img src="https://sendcraft.online/logo.png" alt="SendCraft" width="72" />
</p>

<p align="center">
  <strong>Official Node.js / TypeScript SDK for <a href="https://sendcraft.online">SendCraft</a></strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/sendcraft-sdk"><img src="https://img.shields.io/npm/v/sendcraft-sdk?color=6366f1&label=npm" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/sendcraft-sdk"><img src="https://img.shields.io/npm/dm/sendcraft-sdk?color=10b981&label=downloads" alt="downloads" /></a>
  <img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen" alt="node" />
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT" />
</p>

---

## Installation

```bash
npm install sendcraft-sdk
```

**React Email support** (optional):
```bash
npm install @react-email/render react react-dom
```

---

## Quick Start

```typescript
import { SendCraft } from 'sendcraft-sdk';

const client = new SendCraft({ apiKey: process.env.SENDCRAFT_API_KEY });

// Send a transactional email
await client.emails.send({
  to: 'user@example.com',
  subject: 'Hello!',
  html: '<h1>Welcome aboard</h1>',
});
```

Get your API key from the [SendCraft Dashboard](https://sendcraft.online/dashboard/settings).

---

## API Reference

### `client.emails`

#### `emails.send(options)`

```typescript
await client.emails.send({
  to: 'user@example.com',
  toName: 'Alice',
  subject: 'Your order shipped',
  html: '<p>Your order is on the way!</p>',
  text: 'Your order is on the way!',       // optional plain-text fallback
  from: 'orders@mystore.com',              // optional, defaults to account default
  fromName: 'My Store',
  replyTo: 'support@mystore.com',
  cc: 'manager@mystore.com',
  bcc: ['audit@mystore.com'],
  idempotencyKey: 'order-123-shipped',     // prevent duplicate sends
});
```

#### `emails.batch(emails[])`

Send up to 100 emails in one request.

```typescript
await client.emails.batch([
  { to: 'alice@example.com', subject: 'Hi Alice', html: '<p>Hello</p>' },
  { to: 'bob@example.com',   subject: 'Hi Bob',   html: '<p>Hello</p>' },
]);
```

#### `emails.schedule(options)`

```typescript
await client.emails.schedule({
  to: 'user@example.com',
  subject: 'Reminder',
  html: '<p>Just a reminder!</p>',
  scheduledAt: new Date('2026-04-01T09:00:00Z'),
});
```

#### `emails.cancelSchedule(id)` · `emails.updateSchedule(id, scheduledAt)`

```typescript
await client.emails.cancelSchedule('email_id');
await client.emails.updateSchedule('email_id', new Date('2026-05-01T09:00:00Z'));
```

#### `emails.get(id)` · `emails.list(options?)` · `emails.stats()` · `emails.export(options?)`

```typescript
const email = await client.emails.get('email_id');
const { emails, total } = await client.emails.list({ page: 1, limit: 20, status: 'sent' });
const { stats } = await client.emails.stats();
const csvUrl = await client.emails.export({ days: 30 });
```

#### `emails.render(options)` — React Email (no send)

```typescript
import WelcomeEmail from './emails/WelcomeEmail';

const html = await client.emails.render({ react: <WelcomeEmail name="Alice" /> });
```

---

### `client.campaigns`

```typescript
// Create
const { campaign } = await client.campaigns.create({
  name: 'Summer Sale',
  subject: 'Big discounts inside',
  from: 'deals@mystore.com',
  html: '<h1>Up to 50% off!</h1>',
  recipients: ['a@example.com', 'b@example.com'],
});

// Send
await client.campaigns.send('campaign_id');

// List / Get / Update / Delete
await client.campaigns.list({ page: 1, limit: 10 });
await client.campaigns.get('campaign_id');
await client.campaigns.update('campaign_id', { subject: 'Updated subject' });
await client.campaigns.delete('campaign_id');

// Analytics
const { analytics } = await client.campaigns.analytics('campaign_id');
```

---

### `client.subscribers`

```typescript
await client.subscribers.add({
  email: 'user@example.com',
  listId: 'list_id',
  firstName: 'Alice',
  customFields: { plan: 'pro' },
});

await client.subscribers.import({
  listId: 'list_id',
  subscribers: [{ email: 'a@b.com' }, { email: 'c@d.com' }],
});

await client.subscribers.list({ page: 1, limit: 50, status: 'active' });
await client.subscribers.update('subscriber_id', { firstName: 'Alicia' });
await client.subscribers.delete('subscriber_id');
```

---

### `client.templates`

```typescript
const { template } = await client.templates.create({
  name: 'Welcome Email',
  subject: 'Welcome to {{appName}}',
  html: '<p>Hi {{firstName}}, welcome!</p>',
});

await client.templates.list();
await client.templates.get('template_id');
await client.templates.update('template_id', { subject: 'New subject' });
await client.templates.delete('template_id');
```

---

### `client.domains`

```typescript
const { domain, dnsRecords } = await client.domains.add('myapp.com');
dnsRecords.forEach(r => console.log(`${r.type} ${r.name} → ${r.value}`));

await client.domains.verify(domain._id);
await client.domains.list();
await client.domains.get('domain_id');
await client.domains.delete('domain_id');
```

---

### `client.webhooks`

```typescript
await client.webhooks.create({
  url: 'https://myapp.com/hooks/sendcraft',
  events: ['email.bounced', 'email.opened', 'email.clicked'],
});

await client.webhooks.list();
await client.webhooks.delete('webhook_id');
```

#### Signature Verification

```typescript
app.post('/hooks/sendcraft', express.raw({ type: 'application/json' }), (req, res) => {
  const valid = client.webhooks.verify(
    req.body.toString(),
    req.headers['x-sendcraft-signature'] as string,
    process.env.SENDCRAFT_WEBHOOK_SECRET!,
  );
  if (!valid) return res.sendStatus(401);

  const event = client.webhooks.parse(req.body.toString());
  // event.type: 'email.bounced' | 'email.opened' | 'email.clicked' | ...
  res.sendStatus(200);
});
```

---

### `client.analytics`

```typescript
await client.analytics.overview();
await client.analytics.daily(30);
await client.analytics.campaign('campaign_id');
```

---

### `client.segments` · `client.automation` · `client.smtp` · `client.apiKeys` · `client.topics`

```typescript
// Segments
await client.segments.list();
await client.segments.create({ name: 'VIP users', rules: [...] });

// API Keys
await client.apiKeys.list();
await client.apiKeys.create('CI key', { permissions: 'sending_access' });
await client.apiKeys.revoke('key_id');

// SMTP warmup
await client.smtp.warmupStatus();
```

---

## Error Handling

```typescript
import { SendCraft, AuthenticationError, RateLimitError, NotFoundError, SendCraftError } from 'sendcraft-sdk';

try {
  await client.emails.send({ to: '...', subject: '...', html: '...' });
} catch (err) {
  if (err instanceof AuthenticationError) console.error('Invalid API key');
  else if (err instanceof RateLimitError)  console.error('Rate limited — retry later');
  else if (err instanceof NotFoundError)   console.error('Resource not found');
  else if (err instanceof SendCraftError)  console.error(`API error ${err.status}: ${err.message}`);
  else throw err;
}
```

| Class | HTTP | When |
|---|---|---|
| `AuthenticationError` | 401 | Invalid or missing API key |
| `ForbiddenError` | 403 | Insufficient permissions |
| `NotFoundError` | 404 | Resource not found |
| `RateLimitError` | 429 | Too many requests |
| `ConflictError` | 409 | Duplicate resource |
| `ValidationError` | 422 | Invalid request data |
| `ServerError` | 500 | Server error |

---

## TypeScript

Full TypeScript support — all options and responses are typed.

```typescript
import type { SendEmailOptions, CreateCampaignOptions } from 'sendcraft-sdk';
```

---

## CI/CD

```yaml
# GitHub Actions
- name: Send deploy notification
  env:
    SENDCRAFT_API_KEY: ${{ secrets.SENDCRAFT_API_KEY }}
  run: |
    npx sendcraft-sdk emails.send \
      --to team@myapp.com \
      --subject "Deployed ${{ github.sha }}"
```

---

## Related

| Package | Description |
|---------|-------------|
| [`@sendcraft/cli`](https://www.npmjs.com/package/@sendcraft/cli) | Official CLI |
| [`sendcraft-mcp`](https://www.npmjs.com/package/sendcraft-mcp) | MCP server for AI agents |
| [`sendcraft-sdk` (PyPI)](https://pypi.org/project/sendcraft-sdk/) | Python SDK |

---

## License

MIT © [SendCraft](https://sendcraft.online)
