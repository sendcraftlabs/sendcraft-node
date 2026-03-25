"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Templates = void 0;
class Templates {
    constructor(http) {
        this.http = http;
    }
    /**
     * Create a reusable email template.
     * @example
     * await client.templates.create({ name: 'Welcome', subject: 'Welcome to {{appName}}', html: '<p>Hi {{firstName}}</p>' })
     */
    create(options) {
        return this.http.post('/templates', {
            name: options.name,
            subject: options.subject,
            htmlContent: options.html,
            category: options.category,
            variables: options.variables,
        });
    }
    /** List all templates. */
    list() {
        return this.http.get('/templates');
    }
    /** Get a template by ID. */
    get(templateId) {
        return this.http.get(`/templates/${templateId}`);
    }
    /** Update a template. */
    update(templateId, options) {
        return this.http.put(`/templates/${templateId}`, {
            name: options.name,
            subject: options.subject,
            htmlContent: options.html,
            plainTextContent: options.text,
            previewText: options.previewText,
            category: options.category,
        });
    }
    /** Delete a template. */
    delete(templateId) {
        return this.http.delete(`/templates/${templateId}`);
    }
}
exports.Templates = Templates;
