import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception.js';
import { ErrorCode } from './error-code.enum.js';

export class ValidationException extends AppException {
  constructor(message: string | string[] = 'Validation failed', details?: unknown) {
    super(message, HttpStatus.BAD_REQUEST, ErrorCode.VALIDATION_ERROR, details);
  }
}