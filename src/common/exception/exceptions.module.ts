import { Global, Module } from '@nestjs/common';
import { ExceptionsService } from './exceptions.service.js';
import { AllExceptionsFilter } from './all-exceptions.filter.js';

@Global()
@Module({
  providers: [ExceptionsService, AllExceptionsFilter],
  exports: [ExceptionsService, AllExceptionsFilter],
})
export class ExceptionsModule {}