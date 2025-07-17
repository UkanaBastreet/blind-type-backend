import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AllExceptionsFilter } from './exception.interceptor';
// import * as session from 'express-session';
// import * as cookieParser from 'cookie-parser';
// import { sessionConfig } from './.config/session.config';

import { AppModule } from './app.module';
import { corsConfig } from './.config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const APPLICATION_PORT = config.getOrThrow('APPLICATION_PORT');
  // const COOKIE_SECRET = config.getOrThrow('COOKIE_SECRET');

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // app.use(cookieParser(COOKIE_SECRET));
  // app.use(session(sessionConfig(config)));

  app.enableCors(corsConfig(config));

  await app.listen(APPLICATION_PORT, () =>
    console.log('App running at port: ' + APPLICATION_PORT),
  );
}
bootstrap();
