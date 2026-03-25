export class SendCraftError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(message: string, status: number, code: string) {
    super(message);
    this.name = 'SendCraftError';
    this.status = status;
    this.code = code;
  }
}

export class AuthError extends SendCraftError {
  constructor(message = 'Invalid or missing API key') {
    super(message, 401, 'unauthorized');
    this.name = 'AuthError';
  }
}

export class ForbiddenError extends SendCraftError {
  constructor(message = 'You do not have permission to perform this action') {
    super(message, 403, 'forbidden');
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends SendCraftError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'not_found');
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends SendCraftError {
  constructor(message = 'Resource already exists or conflicts with existing data') {
    super(message, 409, 'conflict');
    this.name = 'ConflictError';
  }
}

export class ValidationError extends SendCraftError {
  constructor(message = 'Validation failed — check your request parameters') {
    super(message, 422, 'validation_error');
    this.name = 'ValidationError';
  }
}

export class RateLimitError extends SendCraftError {
  constructor(message = 'Too many requests — please wait before retrying') {
    super(message, 429, 'rate_limited');
    this.name = 'RateLimitError';
  }
}

export class ServerError extends SendCraftError {
  constructor(message = 'An internal server error occurred') {
    super(message, 500, 'server_error');
    this.name = 'ServerError';
  }
}
