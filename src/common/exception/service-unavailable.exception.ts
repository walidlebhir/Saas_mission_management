import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception.js';
import { ErrorCode } from './error-code.enum.js';

export class ServiceUnavailableException extends AppException {
  constructor(
    message: string | string[] = 'Service unavailable',
    details?: unknown,
  ) {
    super(message, HttpStatus.SERVICE_UNAVAILABLE, ErrorCode.SERVICE_UNAVAILABLE, details);
  }
}