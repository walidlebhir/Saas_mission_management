import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-code.enum.js';

export class AppException extends HttpException {
  constructor(
    message: string | string[],
    status: HttpStatus,
    public readonly code: string = ErrorCode.UNKNOWN_ERROR,
    public readonly details?: unknown,
  ) {
    super({ message, statusCode: status, error: message }, status);
    this.name = this.constructor.name;
  }

  getErrorCode(): string {
    return this.code;
  }

  getDetails(): unknown {
    return this.details;
  }
}