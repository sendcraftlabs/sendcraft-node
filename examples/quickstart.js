/**
 * SendCraft SDK — Quickstart
 * npm install sendcraft-sdk
 */

const SendCraft = require('../lib/index').default;

const client = new SendCraft({ apiKey: process.env.SENDCRAFT_API_KEY });

// ─── Send a transactional email ──────────────────────────────────────────────
async function sendEmail() {
  const result = await client.emails.send({
    to: 'user@example.com',
    subject: 'Welcome to MyApp',
    html: '<h1>Welcome!</h1><p>Thanks for signing up.</p>',
    text: 'Welcome! Thanks for signing up.',
    from: 'noreply@myapp.com',
    fromName: 'MyApp',
  });
  console.log('Sent:', result);
}

// ─── Send to multiple recipients ─────────────────────────────────────────────
async function sendBulk() {
  const result = await client.emails.sendBulk({
    emails: ['alice@example.com', { toEmail: 'bob@example.com', toName: 'Bob' }],
    subject: 'Monthly Newsletter',
    html: '<p>Here is this month\'s update.</p>',
    from: 'newsletter@myapp.com',
  });
  console.log('Bulk sent:', result);
}

// ─── Schedule an email ───────────────────────────────────────────────────────
async function scheduleEmail() {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await client.emails.schedule({
    to: 'user@example.com',
    subject: 'Reminder',
    html: '<p>Just a reminder!</p>',
    scheduledAt: tomorrow,
  });
}

// ─── Create and send a campaign ──────────────────────────────────────────────
async function runCampaign() {
  const { campaign } = await client.campaigns.create({
    name: 'Summer Sale',
    subject: 'Big discounts inside 🎉',
    from: 'deals@mystore.com',
    html: '<h1>Summer Sale</h1><p>Up to 50% off!</p>',
    recipients: ['a@example.com', 'b@example.com'],
  });

  await client.campaigns.send(campaign._id);
  console.log('Campaign sent!');

  const stats = await client.campaigns.analytics(campaign._id);
  console.log('Open rate:', stats.analytics.openRate);
}

// ─── Templates ───────────────────────────────────────────────────────────────
async function manageTemplates() {
  const { template } = await client.templates.create({
    name: 'Welcome Email',
    subject: 'Welcome to {{appName}}',
    html: '<p>Hi {{firstName}}, welcome aboard!</p>',
    variables: ['appName', 'firstName'],
  });

  const all = await client.templates.list();
  console.log(`You have ${all.count} templates`);
}

// ─── Subscribers ─────────────────────────────────────────────────────────────
async function manageSubscribers() {
  await client.subscribers.add({
    email: 'user@example.com',
    listId: 'your_list_id',
    firstName: 'Alice',
  });

  await client.subscribers.import({
    listId: 'your_list_id',
    subscribers: [
      { email: 'bob@example.com', firstName: 'Bob' },
      { email: 'carol@example.com' },
    ],
  });
}

// ─── Analytics ───────────────────────────────────────────────────────────────
async function viewAnalytics() {
  const overview = await client.analytics.overview();
  console.log('Open rate:', overview.analytics.openRate);
  console.log('Total sent:', overview.analytics.totalEmails);

  const last7 = await client.analytics.metrics(7);
  console.log('Last 7 days:', last7.totals);
}

// ─── Domains ─────────────────────────────────────────────────────────────────
async function setupDomain() {
  const { domain, dnsRecords } = await client.domains.add('myapp.com');
  console.log('Add these DNS records at your registrar:');
  dnsRecords.forEach(r => console.log(`  ${r.type}  ${r.name}  →  ${r.value}`));

  // After adding DNS records, verify:
  const verified = await client.domains.verify(domain._id);
  console.log('Verified:', verified);
}

// ─── Error handling ──────────────────────────────────────────────────────────
const { AuthError, RateLimitError, NotFoundError } = require('../lib/index');

async function withErrorHandling() {
  try {
    await client.emails.send({ to: 'user@example.com', subject: 'Hi', html: '<p>Hi</p>' });
  } catch (err) {
    if (err instanceof AuthError) console.error('Check your API key');
    else if (err instanceof RateLimitError) console.error('Slow down — rate limited');
    else if (err instanceof NotFoundError) console.error('Resource not found');
    else console.error('Unexpected error:', err.message);
  }
}

module.exports = { sendEmail, sendBulk, scheduleEmail, runCampaign, manageTemplates, manageSubscribers, viewAnalytics, setupDomain };
