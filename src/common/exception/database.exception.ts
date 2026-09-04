import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception.js';
import { ErrorCode } from './error-code.enum.js';

export class DatabaseException extends AppException {
  constructor(
    message: string | string[] = 'Database operation failed',
    details?: unknown,
  ) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, ErrorCode.DATABASE_ERROR, details);
  }
}