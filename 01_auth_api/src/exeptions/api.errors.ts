class ApiError extends Error {
  status;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static Conflict(message: string) {
    return new ApiError(409, message);
  }

  static UserNotFound(message: string) {
    return new ApiError(404, message);
  }

  static UserUnathorizated(message: string) {
    return new ApiError(401, message);
  }
}

export default ApiError;
