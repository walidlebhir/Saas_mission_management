import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception.js';
import { ErrorCode } from './error-code.enum.js';

export class ForbiddenException extends AppException {
  constructor(message: string | string[] = 'Forbidden', details?: unknown) {
    super(message, HttpStatus.FORBIDDEN, ErrorCode.FORBIDDEN, details);
  }
}