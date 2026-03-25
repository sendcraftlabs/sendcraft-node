"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Domains = void 0;
class Domains {
    constructor(http) {
        this.http = http;
    }
    /**
     * Add a sending domain. Returns DNS records (SPF, DKIM, DMARC) to add at your registrar.
     * @example
     * const { domain, dnsRecords } = await client.domains.add('myapp.com')
     */
    add(domain) {
        return this.http.post('/domains', { domain });
    }
    /** List all sending domains. */
    list(status) {
        return this.http.get('/domains', status ? { status } : undefined);
    }
    /** Get a domain and its DNS records by ID. */
    get(domainId) {
        return this.http.get(`/domains/${domainId}`);
    }
    /** Trigger a DNS verification check. */
    verify(domainId) {
        return this.http.post(`/domains/${domainId}/verify`);
    }
    /** Remove a sending domain. */
    delete(domainId) {
        return this.http.delete(`/domains/${domainId}`);
    }
}
exports.Domains = Domains;
