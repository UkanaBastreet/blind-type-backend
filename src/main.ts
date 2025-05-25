import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception.interceptor';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';
import { sessionConfig } from './config/session.config';
import * as cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const COOKIE_SECRET = config.getOrThrow('COOKIE_SECRET');
  const ALLOWED_ORIGIN = config.getOrThrow('ALLOWED_ORIGIN');

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(session(sessionConfig(config)));
  app.use(cookieParser(COOKIE_SECRET));

  app.enableCors({
    origin: ALLOWED_ORIGIN,
    credentials: true,
    exposedCorsHeaders: ['set-cookie'],
  } as CorsOptions);

  await app.listen(3000);
}
bootstrap();
