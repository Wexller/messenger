export class ApiException extends Error {
  status: number;
  errors: string[];

  constructor(status: number, message: string, errors: string[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiException(401, 'User is unauthorized');
  }

  static BadRequest(message: string, errors: any[] = []) {
    return new ApiException(400, message, errors);
  }
}
