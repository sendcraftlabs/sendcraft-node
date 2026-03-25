import { HttpClient } from '../client';

export class Domains {
  constructor(private http: HttpClient) {}

  /**
   * Add a sending domain. Returns DNS records (SPF, DKIM, DMARC) to add at your registrar.
   * @example
   * const { domain, dnsRecords } = await client.domains.add('myapp.com')
   */
  add(domain: string) {
    return this.http.post('/domains', { domain });
  }

  /** List all sending domains. */
  list(status?: 'pending' | 'verified' | 'failed') {
    return this.http.get('/domains', status ? { status } : undefined);
  }

  /** Get a domain and its DNS records by ID. */
  get(domainId: string) {
    return this.http.get(`/domains/${domainId}`);
  }

  /** Trigger a DNS verification check. */
  verify(domainId: string) {
    return this.http.post(`/domains/${domainId}/verify`);
  }

  /** Remove a sending domain. */
  delete(domainId: string) {
    return this.http.delete(`/domains/${domainId}`);
  }
}
