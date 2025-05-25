"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const exception_interceptor_1 = require("./exception.interceptor");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const session = require("express-session");
const config_1 = require("@nestjs/config");
const session_config_1 = require("./config/session.config");
const cookieParser = require("cookie-parser");
const path_1 = require("path");
const express_1 = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const COOKIE_SECRET = config.getOrThrow('COOKIE_SECRET');
    const ALLOWED_ORIGIN = config.getOrThrow('ALLOWED_ORIGIN');
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Blind Type Backend')
        .setDescription('The notes API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document, {
        customSiteTitle: 'API Docs',
        customCssUrl: '/swagger-ui/swagger-ui.css',
        customJs: [
            '/swagger-ui/swagger-ui-bundle.js',
            '/swagger-ui/swagger-ui-standalone-preset.js',
        ],
    });
    app.useGlobalFilters(new exception_interceptor_1.AllExceptionsFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.use(session((0, session_config_1.sessionConfig)(config)));
    app.use(cookieParser(COOKIE_SECRET));
    app.use('/api', express_1.default.static((0, path_1.join)(__dirname, '..', 'node_modules', 'swagger-ui-dist')));
    app.enableCors({
        origin: ALLOWED_ORIGIN,
        credentials: true,
        exposedCorsHeaders: ['set-cookie'],
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map