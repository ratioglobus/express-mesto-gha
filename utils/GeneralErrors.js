import { StatusCodes } from 'http-status-codes';

export default class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static BadRequest(message) {
    return new ApiError(StatusCodes.BAD_REQUEST, message);
  }

  static Unauthorized(message) {
    return new ApiError(StatusCodes.UNAUTHORIZED, message);
  }

  static Forbidden(message) {
    return new ApiError(StatusCodes.FORBIDDEN, message);
  }

  static NotFound(message) {
    return new ApiError(StatusCodes.NOT_FOUND, message);
  }

  static Conflict(message) {
    return new ApiError(StatusCodes.CONFLICT, message);
  }
}
