"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = corsConfig;
function corsConfig(config) {
    const ALLOWED_ORIGIN = config.getOrThrow('ALLOWED_ORIGIN');
    return {
        origin: Boolean(ALLOWED_ORIGIN),
        credentials: true,
        exposedHeaders: ['set-cookie'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        maxAge: 86400,
    };
}
//# sourceMappingURL=cors.config.js.map