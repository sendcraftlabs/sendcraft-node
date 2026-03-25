import { HttpClient } from '../client';
export interface AddSubscriberOptions {
    email: string;
    listId: string;
    firstName?: string;
    lastName?: string;
    customFields?: Record<string, unknown>;
}
export interface ImportSubscribersOptions {
    listId: string;
    subscribers: Array<{
        email: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
        customFields?: Record<string, unknown>;
    }>;
}
export interface ListSubscribersOptions {
    page?: number;
    limit?: number;
    status?: 'active' | 'unsubscribed' | 'bounced';
}
export interface UpdateSubscriberOptions {
    firstName?: string;
    lastName?: string;
    customFields?: Record<string, unknown>;
    emailPreferences?: Record<string, unknown>;
}
export declare class Subscribers {
    private http;
    constructor(http: HttpClient);
    /**
     * Add a single subscriber to a list.
     * @example
     * await client.subscribers.add({ email: 'user@example.com', listId: 'list_id' })
     */
    add(options: AddSubscriberOptions): Promise<unknown>;
    /**
     * Bulk import up to 10,000 subscribers into a list.
     * @example
     * await client.subscribers.import({ listId: '...', subscribers: [{ email: 'a@b.com' }, { email: 'c@d.com' }] })
     */
    import(options: ImportSubscribersOptions): Promise<unknown>;
    /** List all subscribers across all your lists. */
    list(options?: ListSubscribersOptions): Promise<unknown>;
    /** Get subscribers for a specific list. */
    listByList(listId: string, options?: {
        status?: string;
        limit?: number;
        skip?: number;
    }): Promise<unknown>;
    /** Update subscriber details. */
    update(subscriberId: string, options: UpdateSubscriberOptions): Promise<unknown>;
    /** Soft-delete (archive) a subscriber. */
    delete(subscriberId: string): Promise<unknown>;
    /** Get a subscriber's email preferences. */
    preferences(subscriberId: string): Promise<unknown>;
    /** Update a subscriber's email preferences. */
    updatePreferences(subscriberId: string, emailPreferences: Record<string, unknown>): Promise<unknown>;
}
