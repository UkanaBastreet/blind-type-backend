import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

export function corsConfig(config: ConfigService): CorsOptions {
  const ALLOWED_ORIGIN = config.getOrThrow<boolean>('ALLOWED_ORIGIN');
  return {
    // домены с которых можно принимать запросы
    origin: Boolean(ALLOWED_ORIGIN),

    // флаг который разрешает передачу куков, заголовков авторизации, клиентских ssl-сертификатов
    credentials: true,

    // какие заголовки видит клиент
    exposedHeaders: ['set-cookie'],

    // разрешенные методы
    methods: ['GET', 'POST', 'PUT', 'DELETE'],

    // Максимальное время кеширования CORS-префлайта
    maxAge: 86400, // 24 часа
  };
}
