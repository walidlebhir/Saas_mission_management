import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception.js';
import { ErrorCode } from './error-code.enum.js';

export class FileTooLargeException extends AppException {
  constructor(
    message: string | string[] = 'File is too large',
    details?: unknown,
  ) {
    super(message, HttpStatus.PAYLOAD_TOO_LARGE, ErrorCode.FILE_TOO_LARGE, details);
  }
}