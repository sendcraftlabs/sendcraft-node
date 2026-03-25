import { HttpClient } from '../client';
export interface SegmentRule {
    field: string;
    operator: string;
    value: unknown;
}
export interface Segment {
    _id: string;
    name: string;
    description?: string;
    rules: SegmentRule[];
    matchType: 'all' | 'any';
    subscriberCount?: number;
    createdAt: string;
    updatedAt: string;
}
export interface CreateSegmentParams {
    name: string;
    description?: string;
    rules: SegmentRule[];
    matchType?: 'all' | 'any';
}
export declare class Segments {
    private http;
    constructor(http: HttpClient);
    /** List all segments */
    list(): Promise<{
        success: boolean;
        segments: Segment[];
    }>;
    /** Get a segment by ID */
    get(id: string): Promise<{
        success: boolean;
        segment: Segment;
    }>;
    /** Create a new segment */
    create(params: CreateSegmentParams): Promise<{
        success: boolean;
        segment: Segment;
    }>;
    /** Update a segment */
    update(id: string, params: Partial<CreateSegmentParams>): Promise<{
        success: boolean;
        segment: Segment;
    }>;
    /** Delete a segment */
    delete(id: string): Promise<{
        success: boolean;
    }>;
    /** Preview subscriber count matching a segment's rules */
    preview(id: string): Promise<{
        success: boolean;
        count: number;
    }>;
}
