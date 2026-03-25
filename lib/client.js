"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const axios_1 = __importDefault(require("axios"));
const error_1 = require("./error");
class HttpClient {
    constructor(apiKey, baseUrl) {
        // Reject non-http(s) baseUrl schemes to prevent SSRF via javascript:/file:/data: URIs.
        let parsedUrl;
        try {
            parsedUrl = new URL(baseUrl);
        }
        catch {
            throw new Error(`SendCraft: invalid baseUrl — must be a valid URL, got: ${baseUrl}`);
        }
        if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
            throw new Error(`SendCraft: invalid baseUrl scheme "${parsedUrl.protocol}" — only http: and https: are allowed`);
        }
        this.axios = axios_1.default.create({
            baseURL: baseUrl,
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json',
            },
            timeout: 30000,
        });
    }
    async get(path, params) {
        try {
            const res = await this.axios.get(path, { params });
            return res.data;
        }
        catch (err) {
            throw this.wrap(err);
        }
    }
    async post(path, body, extraHeaders) {
        try {
            const res = await this.axios.post(path, body, extraHeaders ? { headers: extraHeaders } : undefined);
            return res.data;
        }
        catch (err) {
            throw this.wrap(err);
        }
    }
    async put(path, body) {
        try {
            const res = await this.axios.put(path, body);
            return res.data;
        }
        catch (err) {
            throw this.wrap(err);
        }
    }
    async patch(path, body) {
        try {
            const res = await this.axios.patch(path, body);
            return res.data;
        }
        catch (err) {
            throw this.wrap(err);
        }
    }
    async delete(path, body) {
        try {
            const res = await this.axios.delete(path, { data: body });
            return res.data;
        }
        catch (err) {
            throw this.wrap(err);
        }
    }
    wrap(err) {
        if (axios_1.default.isAxiosError(err)) {
            const e = err;
            const msg = e.response?.data?.error ?? e.response?.data?.message ?? e.message;
            switch (e.response?.status) {
                case 401: return new error_1.AuthError(msg);
                case 403: return new error_1.ForbiddenError(msg);
                case 404: return new error_1.NotFoundError(msg);
                case 409: return new error_1.ConflictError(msg);
                case 422: return new error_1.ValidationError(msg);
                case 429: return new error_1.RateLimitError();
                case 500: return new error_1.ServerError(msg);
                default: return new error_1.SendCraftError(msg, e.response?.status ?? 0, 'api_error');
            }
        }
        if (err instanceof error_1.SendCraftError)
            return err;
        return new error_1.SendCraftError(String(err), 0, 'unknown');
    }
}
exports.HttpClient = HttpClient;
