"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Automation = void 0;
class Automation {
    constructor(http) {
        this.http = http;
    }
    /** List all automations */
    list() {
        return this.http.get('/automation');
    }
    /** Get an automation by ID */
    get(id) {
        return this.http.get(`/automation/${id}`);
    }
    /** Create a new automation */
    create(params) {
        return this.http.post('/automation', params);
    }
    /** Update an automation */
    update(id, params) {
        return this.http.put(`/automation/${id}`, params);
    }
    /** Delete an automation */
    delete(id) {
        return this.http.delete(`/automation/${id}`);
    }
    /** Activate an automation */
    activate(id) {
        return this.http.post(`/automation/${id}/activate`);
    }
    /** Pause an automation */
    pause(id) {
        return this.http.post(`/automation/${id}/pause`);
    }
    /** Get enrollments for an automation */
    enrollments(id, params) {
        return this.http.get(`/automation/${id}/enrollments`, params);
    }
    /** Manually enroll a subscriber into an automation */
    enroll(id, subscriberId) {
        return this.http.post(`/automation/${id}/enroll`, { subscriberId });
    }
}
exports.Automation = Automation;
