import { HttpClient } from '../client';

export class Analytics {
  constructor(private http: HttpClient) {}

  /** Overall account analytics (total sent, open rate, click rate). */
  overview() {
    return this.http.get('/analytics/overview');
  }

  /** Daily send/open/click counts for the last N days. */
  daily(days = 30) {
    return this.http.get('/analytics/daily', { days });
  }

  /** Detailed daily metrics including bounce and deliverability rates. */
  metrics(days = 30) {
    return this.http.get('/analytics/metrics', { days });
  }

  /** Analytics for a specific campaign. */
  campaign(campaignId: string) {
    return this.http.get(`/analytics/campaign/${campaignId}`);
  }
}
