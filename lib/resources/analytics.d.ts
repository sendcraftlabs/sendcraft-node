import { HttpClient } from '../client';
export declare class Analytics {
    private http;
    constructor(http: HttpClient);
    /** Overall account analytics (total sent, open rate, click rate). */
    overview(): Promise<unknown>;
    /** Daily send/open/click counts for the last N days. */
    daily(days?: number): Promise<unknown>;
    /** Detailed daily metrics including bounce and deliverability rates. */
    metrics(days?: number): Promise<unknown>;
    /** Analytics for a specific campaign. */
    campaign(campaignId: string): Promise<unknown>;
}
