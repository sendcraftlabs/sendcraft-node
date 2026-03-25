import { HttpClient } from '../client';
export declare class Domains {
    private http;
    constructor(http: HttpClient);
    /**
     * Add a sending domain. Returns DNS records (SPF, DKIM, DMARC) to add at your registrar.
     * @example
     * const { domain, dnsRecords } = await client.domains.add('myapp.com')
     */
    add(domain: string): Promise<unknown>;
    /** List all sending domains. */
    list(status?: 'pending' | 'verified' | 'failed'): Promise<unknown>;
    /** Get a domain and its DNS records by ID. */
    get(domainId: string): Promise<unknown>;
    /** Trigger a DNS verification check. */
    verify(domainId: string): Promise<unknown>;
    /** Remove a sending domain. */
    delete(domainId: string): Promise<unknown>;
}
