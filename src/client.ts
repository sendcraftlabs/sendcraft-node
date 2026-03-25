import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  SendCraftError,
  AuthError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ValidationError,
  RateLimitError,
  ServerError,
} from './error';

export class HttpClient {
  private axios: AxiosInstance;

  constructor(apiKey: string, baseUrl: string) {
    // Reject non-http(s) baseUrl schemes to prevent SSRF via javascript:/file:/data: URIs.
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(baseUrl);
    } catch {
      throw new Error(`SendCraft: invalid baseUrl — must be a valid URL, got: ${baseUrl}`);
    }
    if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
      throw new Error(`SendCraft: invalid baseUrl scheme "${parsedUrl.protocol}" — only http: and https: are allowed`);
    }

    this.axios = axios.create({
      baseURL: baseUrl,
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      timeout: 30_000,
    });
  }

  async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    try {
      const res = await this.axios.get<T>(path, { params });
      return res.data;
    } catch (err) {
      throw this.wrap(err);
    }
  }

  async post<T>(path: string, body?: unknown, extraHeaders?: Record<string, string>): Promise<T> {
    try {
      const res = await this.axios.post<T>(path, body, extraHeaders ? { headers: extraHeaders } : undefined);
      return res.data;
    } catch (err) {
      throw this.wrap(err);
    }
  }

  async put<T>(path: string, body?: unknown): Promise<T> {
    try {
      const res = await this.axios.put<T>(path, body);
      return res.data;
    } catch (err) {
      throw this.wrap(err);
    }
  }

  async patch<T>(path: string, body?: unknown): Promise<T> {
    try {
      const res = await this.axios.patch<T>(path, body);
      return res.data;
    } catch (err) {
      throw this.wrap(err);
    }
  }

  async delete<T>(path: string, body?: unknown): Promise<T> {
    try {
      const res = await this.axios.delete<T>(path, { data: body });
      return res.data;
    } catch (err) {
      throw this.wrap(err);
    }
  }

  private wrap(err: unknown): SendCraftError {
    if (axios.isAxiosError(err)) {
      const e = err as AxiosError<{ error?: string; message?: string }>;
      const msg = e.response?.data?.error ?? e.response?.data?.message ?? e.message;
      switch (e.response?.status) {
        case 401: return new AuthError(msg);
        case 403: return new ForbiddenError(msg);
        case 404: return new NotFoundError(msg);
        case 409: return new ConflictError(msg);
        case 422: return new ValidationError(msg);
        case 429: return new RateLimitError();
        case 500: return new ServerError(msg);
        default:  return new SendCraftError(msg, e.response?.status ?? 0, 'api_error');
      }
    }
    if (err instanceof SendCraftError) return err;
    return new SendCraftError(String(err), 0, 'unknown');
  }
}
