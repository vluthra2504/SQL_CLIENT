class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.code = statusCode || 500;
    this.name = "ApiError";
  }
}

class UnauthorizedError extends ApiError {
  constructor(message) {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

class BadRequestError extends ApiError {
  constructor(message) {
    super(message, 400);
    this.name = "BadRequestError";
  }
}

class InternalServerError extends ApiError {
  constructor(message) {
    super(message, 500);
    this.name = "InternalServerError";
  }
}

module.exports = {
  ApiError,
  UnauthorizedError,
  BadRequestError,
  InternalServerError,
};
