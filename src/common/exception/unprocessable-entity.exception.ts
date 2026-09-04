import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception.js';
import { ErrorCode } from './error-code.enum.js';

export class UnprocessableEntityException extends AppException {
  constructor(
    message: string | string[] = 'Unprocessable entity',
    details?: unknown,
  ) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY, ErrorCode.UNPROCESSABLE_ENTITY, details);
  }
}