import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception.js';
import { ErrorCode } from './error-code.enum.js';

export class ConflictException extends AppException {
  constructor(message: string | string[] = 'Conflict', details?: unknown) {
    super(message, HttpStatus.CONFLICT, ErrorCode.CONFLICT, details);
  }
}