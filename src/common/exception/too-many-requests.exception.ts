import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception.js';
import { ErrorCode } from './error-code.enum.js';

export class TooManyRequestsException extends AppException {
  constructor(
    message: string | string[] = 'Too many requests',
    details?: unknown,
  ) {
    super(message, HttpStatus.TOO_MANY_REQUESTS, ErrorCode.TOO_MANY_REQUESTS, details);
  }
}