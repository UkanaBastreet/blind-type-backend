import { ConfigService } from '@nestjs/config';
import { RedisStore } from 'connect-redis';
import IORedis from 'ioredis';
import * as session from 'express-session';

export function sessionConfig(config: ConfigService): session.SessionOptions {
  const REDIS_URL = config.getOrThrow('REDIS_URL');
  const redis = new IORedis(REDIS_URL);
  return {
    secret: config.getOrThrow<string>('SESSION_SECRET'),
    name: config.getOrThrow<string>('SESSION_NAME'),
    resave: true,
    saveUninitialized: false,
    cookie: {
      domain: config.getOrThrow<string>('SESSION_DOMAIN'),
      maxAge: +config.getOrThrow<string>('SESSION_MAX_AGE'),
      httpOnly:
        config.getOrThrow<string>('SESSION_HTTP_ONLY') === 'true'
          ? true
          : false,
      secure:
        config.getOrThrow<string>('SESSION_SECURE') === 'true' ? true : false,
      sameSite: 'lax',
    },
    store: new RedisStore({
      client: redis,
      prefix: config.getOrThrow<string>('SESSION_FOLDER'),
    }),
  };
}
