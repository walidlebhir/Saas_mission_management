import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception.js';
import { ErrorCode } from './error-code.enum.js';

export class UnauthorizedException extends AppException {
  constructor(message: string | string[] = 'Unauthorized', details?: unknown) {
    super(message, HttpStatus.UNAUTHORIZED, ErrorCode.UNAUTHORIZED, details);
  }
}