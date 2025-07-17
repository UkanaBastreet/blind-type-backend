"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeOrmConfig = getTypeOrmConfig;
function getTypeOrmConfig(configService) {
    const mode = configService.getOrThrow('mode');
    const isDev = mode === 'development' && process.env.NODE_ENV !== 'production';
    const POSTGRES_URL = configService.getOrThrow('POSTGRES_URL');
    return {
        type: 'postgres',
        url: POSTGRES_URL,
        ssl: true,
        extra: {
            ssl: {
                rejectUnauthorized: false,
            },
            connectionLimit: 5,
        },
        autoLoadEntities: isDev,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: isDev,
        migrationsRun: isDev,
        logging: ['error'],
        poolSize: 5,
        connectTimeoutMS: 5000,
        retryAttempts: 3,
        retryDelay: 3000,
    };
}
//# sourceMappingURL=typeorm.config.js.map