import { Injectable } from '@nestjs/common';
import { BadRequestException } from './bad-request.exception.js';
import { ValidationException } from './validation.exception.js';
import { UnauthorizedException } from './unauthorized.exception.js';
import { ForbiddenException } from './forbidden.exception.js';
import { NotFoundException } from './not-found.exception.js';
import { ConflictException } from './conflict.exception.js';
import { DuplicateEntryException } from './duplicate-entry.exception.js';
import { InvalidCredentialsException } from './invalid-credentials.exception.js';
import { UnprocessableEntityException } from './unprocessable-entity.exception.js';
import { TooManyRequestsException } from './too-many-requests.exception.js';
import { InternalServerErrorException } from './internal-server-error.exception.js';
import { ServiceUnavailableException } from './service-unavailable.exception.js';
import { DatabaseException } from './database.exception.js';
import { FileValidationException } from './file-validation.exception.js';
import { FileTooLargeException } from './file-too-large.exception.js';
import { UnsupportedFileTypeException } from './unsupported-file-type.exception.js';
import { OperationNotAllowedException } from './operation-not-allowed.exception.js';

@Injectable()
export class ExceptionsService {
  badRequest(message?: string | string[], details?: unknown): BadRequestException {
    return new BadRequestException(message, details);
  }

  validation(message?: string | string[], details?: unknown): ValidationException {
    return new ValidationException(message, details);
  }

  unauthorized(message?: string | string[], details?: unknown): UnauthorizedException {
    return new UnauthorizedException(message, details);
  }

  forbidden(message?: string | string[], details?: unknown): ForbiddenException {
    return new ForbiddenException(message, details);
  }

  notFound(message?: string | string[], details?: unknown): NotFoundException {
    return new NotFoundException(message, details);
  }

  conflict(message?: string | string[], details?: unknown): ConflictException {
    return new ConflictException(message, details);
  }

  duplicate(message?: string | string[], details?: unknown): DuplicateEntryException {
    return new DuplicateEntryException(message, details);
  }

  invalidCredentials(
    message?: string | string[],
    details?: unknown,
  ): InvalidCredentialsException {
    return new InvalidCredentialsException(message, details);
  }

  unprocessable(
    message?: string | string[],
    details?: unknown,
  ): UnprocessableEntityException {
    return new UnprocessableEntityException(message, details);
  }

  tooManyRequests(
    message?: string | string[],
    details?: unknown,
  ): TooManyRequestsException {
    return new TooManyRequestsException(message, details);
  }

  internalServer(
    message?: string | string[],
    details?: unknown,
  ): InternalServerErrorException {
    return new InternalServerErrorException(message, details);
  }

  serviceUnavailable(
    message?: string | string[],
    details?: unknown,
  ): ServiceUnavailableException {
    return new ServiceUnavailableException(message, details);
  }

  database(message?: string | string[], details?: unknown): DatabaseException {
    return new DatabaseException(message, details);
  }

  invalidFile(message?: string | string[], details?: unknown): FileValidationException {
    return new FileValidationException(message, details);
  }

  fileTooLarge(message?: string | string[], details?: unknown): FileTooLargeException {
    return new FileTooLargeException(message, details);
  }

  unsupportedFileType(
    message?: string | string[],
    details?: unknown,
  ): UnsupportedFileTypeException {
    return new UnsupportedFileTypeException(message, details);
  }

  operationNotAllowed(
    message?: string | string[],
    details?: unknown,
  ): OperationNotAllowedException {
    return new OperationNotAllowedException(message, details);
  }
}