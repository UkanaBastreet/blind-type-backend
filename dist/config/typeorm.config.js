"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeOrmConfig = getTypeOrmConfig;
function getTypeOrmConfig(configService) {
    return {
        type: 'postgres',
        url: configService.get('POSTGRES_URL'),
        ssl: true,
        extra: {
            ssl: {
                rejectUnauthorized: false,
            },
            connectionLimit: 5,
        },
        autoLoadEntities: true,
        synchronize: true,
        logging: ['query', 'error'],
        poolSize: 5,
        connectTimeoutMS: 5000,
        retryAttempts: 3,
        retryDelay: 3000,
    };
}
//# sourceMappingURL=typeorm.config.js.map