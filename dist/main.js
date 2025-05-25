"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const exception_interceptor_1 = require("./exception.interceptor");
const common_1 = require("@nestjs/common");
const session = require("express-session");
const config_1 = require("@nestjs/config");
const session_config_1 = require("./config/session.config");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const COOKIE_SECRET = config.getOrThrow('COOKIE_SECRET');
    const ALLOWED_ORIGIN = config.getOrThrow('ALLOWED_ORIGIN');
    app.useGlobalFilters(new exception_interceptor_1.AllExceptionsFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.use(session((0, session_config_1.sessionConfig)(config)));
    app.use(cookieParser(COOKIE_SECRET));
    app.enableCors({
        origin: ALLOWED_ORIGIN,
        credentials: true,
        exposedCorsHeaders: ['set-cookie'],
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map