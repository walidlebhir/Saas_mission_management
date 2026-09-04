import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception.js';
import { ErrorCode } from './error-code.enum.js';

export class NotFoundException extends AppException {
  constructor(message: string | string[] = 'Resource not found', details?: unknown) {
    super(message, HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND, details);
  }
}