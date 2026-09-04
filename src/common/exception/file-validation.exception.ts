import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception.js';
import { ErrorCode } from './error-code.enum.js';

export class FileValidationException extends AppException {
  constructor(message: string | string[] = 'Invalid file', details?: unknown) {
    super(message, HttpStatus.BAD_REQUEST, ErrorCode.INVALID_FILE, details);
  }
}