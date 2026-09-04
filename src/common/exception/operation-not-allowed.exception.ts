import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception.js';
import { ErrorCode } from './error-code.enum.js';

export class OperationNotAllowedException extends AppException {
  constructor(
    message: string | string[] = 'Operation not allowed',
    details?: unknown,
  ) {
    super(message, HttpStatus.FORBIDDEN, ErrorCode.OPERATION_NOT_ALLOWED, details);
  }
}