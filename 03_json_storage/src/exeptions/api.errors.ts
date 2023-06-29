class ApiError extends Error {
  status;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static Conflict(message: string) {
    return new ApiError(409, message);
  }

  static JsonNotFound(message: string) {
    return new ApiError(404, message);
  }
}

export default ApiError;
