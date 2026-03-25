"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscribers = void 0;
class Subscribers {
    constructor(http) {
        this.http = http;
    }
    /**
     * Add a single subscriber to a list.
     * @example
     * await client.subscribers.add({ email: 'user@example.com', listId: 'list_id' })
     */
    add(options) {
        return this.http.post('/subscribers/add', {
            email: options.email,
            listId: options.listId,
            firstName: options.firstName,
            lastName: options.lastName,
            customFields: options.customFields,
        });
    }
    /**
     * Bulk import up to 10,000 subscribers into a list.
     * @example
     * await client.subscribers.import({ listId: '...', subscribers: [{ email: 'a@b.com' }, { email: 'c@d.com' }] })
     */
    import(options) {
        return this.http.post('/subscribers/import', {
            listId: options.listId,
            subscribers: options.subscribers,
        });
    }
    /** List all subscribers across all your lists. */
    list(options = {}) {
        return this.http.get('/subscribers', options);
    }
    /** Get subscribers for a specific list. */
    listByList(listId, options = {}) {
        return this.http.get(`/subscribers/list/${listId}`, options);
    }
    /** Update subscriber details. */
    update(subscriberId, options) {
        return this.http.put(`/subscribers/${subscriberId}`, options);
    }
    /** Soft-delete (archive) a subscriber. */
    delete(subscriberId) {
        return this.http.delete(`/subscribers/${subscriberId}`);
    }
    /** Get a subscriber's email preferences. */
    preferences(subscriberId) {
        return this.http.get(`/subscribers/preferences/${subscriberId}`);
    }
    /** Update a subscriber's email preferences. */
    updatePreferences(subscriberId, emailPreferences) {
        return this.http.put(`/subscribers/${subscriberId}/preferences`, { emailPreferences });
    }
}
exports.Subscribers = Subscribers;
