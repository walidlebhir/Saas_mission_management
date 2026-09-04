import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception.js';
import { ErrorCode } from './error-code.enum.js';

export class BadRequestException extends AppException {
  constructor(message: string | string[] = 'Bad request', details?: unknown) {
    super(message, HttpStatus.BAD_REQUEST, ErrorCode.INVALID_REQUEST, details);
  }
}