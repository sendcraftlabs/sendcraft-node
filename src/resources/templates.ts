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

export class Templates {
  constructor(private http: HttpClient) {}

  /**
   * Create a reusable email template.
   * @example
   * await client.templates.create({ name: 'Welcome', subject: 'Welcome to {{appName}}', html: '<p>Hi {{firstName}}</p>' })
   */
  create(options: CreateTemplateOptions) {
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
  get(templateId: string) {
    return this.http.get(`/templates/${templateId}`);
  }

  /** Update a template. */
  update(templateId: string, options: UpdateTemplateOptions) {
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
  delete(templateId: string) {
    return this.http.delete(`/templates/${templateId}`);
  }
}
