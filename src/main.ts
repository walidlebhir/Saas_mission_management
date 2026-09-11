import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule, ObserveInstrument } from './app.module.js';
import { AllExceptionsFilter } from './common/exception/all-exceptions.filter.js';
import  morgan from "morgan" ;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  // cors system access application web
  app.enableCors({
    origin: [process.env.FRONTEND_URL ?? 'http://localhost:5173'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(morgan("dev")) ;


  const swaggerConfig = new DocumentBuilder()
    .setTitle('Dependance Project API')
    .setDescription('Documentation de l\'API Dependance Project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
