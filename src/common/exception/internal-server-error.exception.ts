import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception.js';
import { ErrorCode } from './error-code.enum.js';

export class InternalServerErrorException extends AppException {
  constructor(
    message: string | string[] = 'Internal server error',
    details?: unknown,
  ) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, ErrorCode.INTERNAL_SERVER_ERROR, details);
  }
}