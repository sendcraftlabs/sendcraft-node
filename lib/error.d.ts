export declare class SendCraftError extends Error {
    readonly status: number;
    readonly code: string;
    constructor(message: string, status: number, code: string);
}
export declare class AuthError extends SendCraftError {
    constructor(message?: string);
}
export declare class ForbiddenError extends SendCraftError {
    constructor(message?: string);
}
export declare class NotFoundError extends SendCraftError {
    constructor(message?: string);
}
export declare class ConflictError extends SendCraftError {
    constructor(message?: string);
}
export declare class ValidationError extends SendCraftError {
    constructor(message?: string);
}
export declare class RateLimitError extends SendCraftError {
    constructor(message?: string);
}
export declare class ServerError extends SendCraftError {
    constructor(message?: string);
}
