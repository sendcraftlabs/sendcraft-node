"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeys = void 0;
class ApiKeys {
    constructor(http) {
        this.http = http;
    }
    /** List all API keys for the authenticated account */
    list() {
        return this.http.get('/user/keys');
    }
    /**
     * Create a new API key.
     * The full key is returned **once** in the response — store it immediately.
     */
    create(name, options) {
        // Explicitly pick only known fields instead of spreading `options` to
        // prevent accidental prototype-pollution keys (__proto__, constructor, etc.)
        // from being forwarded to the API.
        return this.http.post('/user/keys', {
            name,
            ...(options?.permissions !== undefined ? { permissions: options.permissions } : {}),
            ...(options?.allowedDomains !== undefined ? { allowedDomains: options.allowedDomains } : {}),
        });
    }
    /** Rename an existing API key */
    rename(keyId, name) {
        return this.http.patch(`/user/keys/${keyId}`, { name });
    }
    /** Revoke an API key — permanently disables it */
    revoke(keyId, reason) {
        return this.http.delete(`/user/keys/${keyId}`, { reason });
    }
}
exports.ApiKeys = ApiKeys;
