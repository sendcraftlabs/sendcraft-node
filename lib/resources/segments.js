"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Segments = void 0;
class Segments {
    constructor(http) {
        this.http = http;
    }
    /** List all segments */
    list() {
        return this.http.get('/segments');
    }
    /** Get a segment by ID */
    get(id) {
        return this.http.get(`/segments/${id}`);
    }
    /** Create a new segment */
    create(params) {
        return this.http.post('/segments', params);
    }
    /** Update a segment */
    update(id, params) {
        return this.http.put(`/segments/${id}`, params);
    }
    /** Delete a segment */
    delete(id) {
        return this.http.delete(`/segments/${id}`);
    }
    /** Preview subscriber count matching a segment's rules */
    preview(id) {
        return this.http.get(`/segments/${id}/preview`);
    }
}
exports.Segments = Segments;
