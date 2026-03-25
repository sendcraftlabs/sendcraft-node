import { HttpClient } from '../client';
export interface CreateTemplateOptions {
    name: string;
    subject: string;
    html: string;
    category?: string;
    variables?: string[];
}
export interface UpdateTemplateOptions {
    name?: string;
    subject?: string;
    html?: string;
    text?: string;
    previewText?: string;
    category?: string;
}
export declare class Templates {
    private http;
    constructor(http: HttpClient);
    /**
     * Create a reusable email template.
     * @example
     * await client.templates.create({ name: 'Welcome', subject: 'Welcome to {{appName}}', html: '<p>Hi {{firstName}}</p>' })
     */
    create(options: CreateTemplateOptions): Promise<unknown>;
    /** List all templates. */
    list(): Promise<unknown>;
    /** Get a template by ID. */
    get(templateId: string): Promise<unknown>;
    /** Update a template. */
    update(templateId: string, options: UpdateTemplateOptions): Promise<unknown>;
    /** Delete a template. */
    delete(templateId: string): Promise<unknown>;
}
