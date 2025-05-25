import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';
import { sessionConfig } from './config/session.config';
import * as cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { join } from 'path';
import express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const COOKIE_SECRET = config.getOrThrow('COOKIE_SECRET');
  const ALLOWED_ORIGIN = config.getOrThrow('ALLOWED_ORIGIN');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Blind Type Backend')
    .setDescription('The notes API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'API Docs',
    customCssUrl: '/swagger-ui/swagger-ui.css',
    customJs: [
      '/swagger-ui/swagger-ui-bundle.js',
      '/swagger-ui/swagger-ui-standalone-preset.js',
    ],
  });

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(session(sessionConfig(config)));
  app.use(cookieParser(COOKIE_SECRET));
  app.use(
    '/api',
    express.static(join(__dirname, '..', 'node_modules', 'swagger-ui-dist')),
  );

  app.enableCors({
    origin: ALLOWED_ORIGIN,
    credentials: true,
    exposedCorsHeaders: ['set-cookie'],
  } as CorsOptions);

  await app.listen(3000);
}
bootstrap();
