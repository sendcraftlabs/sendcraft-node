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

export class Segments {
  constructor(private http: HttpClient) {}

  /** List all segments */
  list(): Promise<{ success: boolean; segments: Segment[] }> {
    return this.http.get('/segments');
  }

  /** Get a segment by ID */
  get(id: string): Promise<{ success: boolean; segment: Segment }> {
    return this.http.get(`/segments/${id}`);
  }

  /** Create a new segment */
  create(params: CreateSegmentParams): Promise<{ success: boolean; segment: Segment }> {
    return this.http.post('/segments', params);
  }

  /** Update a segment */
  update(id: string, params: Partial<CreateSegmentParams>): Promise<{ success: boolean; segment: Segment }> {
    return this.http.put(`/segments/${id}`, params);
  }

  /** Delete a segment */
  delete(id: string): Promise<{ success: boolean }> {
    return this.http.delete(`/segments/${id}`);
  }

  /** Preview subscriber count matching a segment's rules */
  preview(id: string): Promise<{ success: boolean; count: number }> {
    return this.http.get(`/segments/${id}/preview`);
  }
}
