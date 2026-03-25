export declare class HttpClient {
    private axios;
    constructor(apiKey: string, baseUrl: string);
    get<T>(path: string, params?: Record<string, unknown>): Promise<T>;
    post<T>(path: string, body?: unknown, extraHeaders?: Record<string, string>): Promise<T>;
    put<T>(path: string, body?: unknown): Promise<T>;
    patch<T>(path: string, body?: unknown): Promise<T>;
    delete<T>(path: string, body?: unknown): Promise<T>;
    private wrap;
}
