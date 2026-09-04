import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception.js';
import { ErrorCode } from './error-code.enum.js';

export class InvalidCredentialsException extends AppException {
  constructor(
    message: string | string[] = 'Invalid email or password',
    details?: unknown,
  ) {
    super(message, HttpStatus.UNAUTHORIZED, ErrorCode.INVALID_CREDENTIALS, details);
  }
}