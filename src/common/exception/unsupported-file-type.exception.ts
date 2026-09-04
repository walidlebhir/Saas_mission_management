import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception.js';
import { ErrorCode } from './error-code.enum.js';

export class UnsupportedFileTypeException extends AppException {
  constructor(
    message: string | string[] = 'Unsupported file type',
    details?: unknown,
  ) {
    super(message, HttpStatus.BAD_REQUEST, ErrorCode.UNSUPPORTED_FILE_TYPE, details);
  }
}