import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function getTypeOrmConfig(
  configService: ConfigService,
): TypeOrmModuleOptions {
  const mode = configService.getOrThrow<string>('mode');
  const isDev = mode === 'development' && process.env.NODE_ENV !== 'production';
  const POSTGRES_URL = configService.getOrThrow<string>('POSTGRES_URL');
  return {
    type: 'postgres',
    url: POSTGRES_URL,
    ssl: true, // Обязательно для Neon
    extra: {
      ssl: {
        rejectUnauthorized: false, // Для работы с SSL
      },
      connectionLimit: 5, // Рекомендуется для PgBouncer
    },
    autoLoadEntities: isDev, // Автоматическая загрузка сущностей только в режиме разработки
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: isDev, // Только для разработки
    migrationsRun: isDev, // Запуск миграций только в режиме разработки
    logging: ['error'],
    poolSize: 5,
    connectTimeoutMS: 5000,
    retryAttempts: 3,
    retryDelay: 3000,
  };
}
