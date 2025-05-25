import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function getTypeOrmConfig(
  configService: ConfigService,
): TypeOrmModuleOptions {
  return {
    // type: 'postgres',
    // host: configService.getOrThrow<string>('POSTGRES_HOST'),
    // port: configService.getOrThrow<number>('POSTGRES_PORT'),
    // username: configService.getOrThrow<string>('POSTGRES_USER'),
    // password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
    // database: configService.getOrThrow<string>('POSTGRES_DATABASE'),
    // autoLoadEntities: true,
    // synchronize: true,
    // // logging: true,
    // extra: {
    //   trustServerCertificate: true,
    // },
    // connectTimeoutMS: 5000,
    // retryAttempts: 3,
    // retryDelay: 3000,

    type: 'postgres',
    url: configService.get('POSTGRES_URL'), // Используем URL соединения
    // Альтернативно можно использовать отдельные параметры:
    /*
    host: configService.get('POSTGRES_HOST'),
    port: 5432, // Стандартный порт для Neon
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DATABASE'),
    */
    ssl: true, // Обязательно для Neon
    extra: {
      ssl: {
        rejectUnauthorized: false, // Для работы с SSL
      },
      connectionLimit: 5, // Рекомендуется для PgBouncer
    },
    autoLoadEntities: true,
    synchronize: true, // Только для разработки!
    logging: ['query', 'error'], // Включите по необходимости
    poolSize: 5, // Оптимально для соединений через PgBouncer
    connectTimeoutMS: 5000,
    retryAttempts: 3,
    retryDelay: 3000,
  };
}

// Ключевые изменения:
// Использование URL соединения:
// Лучше использовать url вместо отдельных параметров, так как Neon предоставляет готовую строку подключения
// В вашем случае: POSTGRES_URL=postgres://default:...@ep-broad-night.../verceldb?sslmode=require
// Настройки SSL:
// Обязательно включите ssl: true
// Добавьте rejectUnauthorized: false в extra, так как Neon использует самоподписанные сертификаты
// Оптимизация для PgBouncer:
// connectionLimit и poolSize помогают эффективнее работать с пулером соединений
// Neon рекомендует лимит в 5 соединений для бесплатного тарифа
// Безопасность:
// synchronize: true должен быть только в разработке
// В продакшене лучше использовать миграции
// Дополнительные параметры:
// Я добавил logging для отладки (можно отключить в проде)
// Таймауты и ретраи оставлены как у вас
