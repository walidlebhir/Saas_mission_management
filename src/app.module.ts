import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { OrganizationsModule } from './organizations/organizations.module.js';
import { MissionsModule } from './missions/missions.module.js';
import { ExpensesModule } from './expenses/expenses.module.js';

import { OcrModule } from './ocr/ocr.module.js';

import { AdminModule } from './admin/admin.module.js';
import { AuditModule } from './audit/audit.module.js';

import { NotificationsModule } from './notifications/notifications.module.js';

import { ExceptionsModule } from './common/exception/exceptions.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";




@Module({
  imports: [

    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'backend',
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),

      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,

        autoLoadEntities: true,

        synchronize: true,

      }),

    AuthModule,
    UsersModule,
    OrganizationsModule,
    MissionsModule,
    ExpensesModule,

    OcrModule,

    AdminModule,
    AuditModule,

    NotificationsModule,

    ExceptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
