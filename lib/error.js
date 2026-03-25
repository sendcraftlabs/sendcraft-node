"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = exports.RateLimitError = exports.ValidationError = exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.AuthError = exports.SendCraftError = void 0;
class SendCraftError extends Error {
    constructor(message, status, code) {
        super(message);
        this.name = 'SendCraftError';
        this.status = status;
        this.code = code;
    }
}
exports.SendCraftError = SendCraftError;
class AuthError extends SendCraftError {
    constructor(message = 'Invalid or missing API key') {
        super(message, 401, 'unauthorized');
        this.name = 'AuthError';
    }
}
exports.AuthError = AuthError;
class ForbiddenError extends SendCraftError {
    constructor(message = 'You do not have permission to perform this action') {
        super(message, 403, 'forbidden');
        this.name = 'ForbiddenError';
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends SendCraftError {
    constructor(message = 'Resource not found') {
        super(message, 404, 'not_found');
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends SendCraftError {
    constructor(message = 'Resource already exists or conflicts with existing data') {
        super(message, 409, 'conflict');
        this.name = 'ConflictError';
    }
}
exports.ConflictError = ConflictError;
class ValidationError extends SendCraftError {
    constructor(message = 'Validation failed — check your request parameters') {
        super(message, 422, 'validation_error');
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class RateLimitError extends SendCraftError {
    constructor(message = 'Too many requests — please wait before retrying') {
        super(message, 429, 'rate_limited');
        this.name = 'RateLimitError';
    }
}
exports.RateLimitError = RateLimitError;
class ServerError extends SendCraftError {
    constructor(message = 'An internal server error occurred') {
        super(message, 500, 'server_error');
        this.name = 'ServerError';
    }
}
exports.ServerError = ServerError;
