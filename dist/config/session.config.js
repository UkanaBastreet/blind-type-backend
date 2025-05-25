"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionConfig = sessionConfig;
const connect_redis_1 = require("connect-redis");
const ioredis_1 = require("ioredis");
function sessionConfig(config) {
    const REDIS_URL = config.getOrThrow('REDIS_URL');
    const redis = new ioredis_1.default(REDIS_URL);
    return {
        secret: config.getOrThrow('SESSION_SECRET'),
        name: config.getOrThrow('SESSION_NAME'),
        resave: true,
        saveUninitialized: false,
        cookie: {
            domain: config.getOrThrow('SESSION_DOMAIN'),
            maxAge: +config.getOrThrow('SESSION_MAX_AGE'),
            httpOnly: config.getOrThrow('SESSION_HTTP_ONLY') === 'true'
                ? true
                : false,
            secure: config.getOrThrow('SESSION_SECURE') === 'true' ? true : false,
            sameSite: 'lax',
        },
        store: new connect_redis_1.RedisStore({
            client: redis,
            prefix: config.getOrThrow('SESSION_FOLDER'),
        }),
    };
}
//# sourceMappingURL=session.config.js.map