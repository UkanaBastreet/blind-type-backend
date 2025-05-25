"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeOrmConfig = getTypeOrmConfig;
function getTypeOrmConfig(configService) {
    return {
        type: 'postgres',
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: configService.getOrThrow('POSTGRES_PORT'),
        username: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        database: configService.getOrThrow('POSTGRES_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
        extra: {
            trustServerCertificate: true,
        },
        connectTimeoutMS: 5000,
        retryAttempts: 3,
        retryDelay: 3000,
    };
}
//# sourceMappingURL=typeorm.config.js.map