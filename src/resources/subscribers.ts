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

export class Subscribers {
  constructor(private http: HttpClient) {}

  /**
   * Add a single subscriber to a list.
   * @example
   * await client.subscribers.add({ email: 'user@example.com', listId: 'list_id' })
   */
  add(options: AddSubscriberOptions) {
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
  import(options: ImportSubscribersOptions) {
    return this.http.post('/subscribers/import', {
      listId: options.listId,
      subscribers: options.subscribers,
    });
  }

  /** List all subscribers across all your lists. */
  list(options: ListSubscribersOptions = {}) {
    return this.http.get('/subscribers', options as Record<string, unknown>);
  }

  /** Get subscribers for a specific list. */
  listByList(listId: string, options: { status?: string; limit?: number; skip?: number } = {}) {
    return this.http.get(`/subscribers/list/${listId}`, options as Record<string, unknown>);
  }

  /** Update subscriber details. */
  update(subscriberId: string, options: UpdateSubscriberOptions) {
    return this.http.put(`/subscribers/${subscriberId}`, options);
  }

  /** Soft-delete (archive) a subscriber. */
  delete(subscriberId: string) {
    return this.http.delete(`/subscribers/${subscriberId}`);
  }

  /** Get a subscriber's email preferences. */
  preferences(subscriberId: string) {
    return this.http.get(`/subscribers/preferences/${subscriberId}`);
  }

  /** Update a subscriber's email preferences. */
  updatePreferences(subscriberId: string, emailPreferences: Record<string, unknown>) {
    return this.http.put(`/subscribers/${subscriberId}/preferences`, { emailPreferences });
  }
}
