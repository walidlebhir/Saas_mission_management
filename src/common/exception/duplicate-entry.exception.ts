import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception.js';
import { ErrorCode } from './error-code.enum.js';

export class DuplicateEntryException extends AppException {
  constructor(message: string | string[] = 'Duplicate entry', details?: unknown) {
    super(message, HttpStatus.CONFLICT, ErrorCode.DUPLICATE_ENTRY, details);
  }
}