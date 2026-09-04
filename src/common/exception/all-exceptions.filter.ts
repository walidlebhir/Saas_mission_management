import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { AppException } from './app-exception.js';
import { ErrorCode } from './error-code.enum.js';

interface ErrorResponseBody {
  statusCode: number;
  message: string | string[];
  error: string;
  errorCode: string;
  details?: unknown;
  timestamp: string;
  path: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<{ url: string }>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';
    let errorCode: string = ErrorCode.INTERNAL_SERVER_ERROR;
    let details: unknown;
    let errorName = 'HttpException';

    if (exception instanceof AppException) {
      status = exception.getStatus();
      message = exception.message;
      errorCode = exception.getErrorCode();
      details = exception.getDetails();
      errorName = exception.name;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorName = exception.name;
      const body = exception.getResponse();
      if (typeof body === 'string') {
        message = body;
      } else if (body && typeof body === 'object') {
        const record = body as { message?: string | string[]; error?: string };
        message = record.message ?? exception.message;
        errorName = record.error ?? errorName;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      errorName = exception.name;
    }

    const responseBody: ErrorResponseBody = {
      statusCode: status,
      message,
      error: errorName,
      errorCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (details !== undefined) {
      responseBody.details = details;
    }

    response.status(status).json(responseBody);
  }
}