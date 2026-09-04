import { HttpStatus } from '@nestjs/common';
import { AppException } from './app-exception.js';
import { ErrorCode } from './error-code.enum.js';

export class ResourceExistsException extends AppException {
  constructor(message: string | string[] = 'Resource already exists', details?: unknown) {
    super(message, HttpStatus.CONFLICT, ErrorCode.RESOURCE_EXISTS, details);
  }
}