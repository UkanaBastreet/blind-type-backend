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
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Blind Type Backend')
        .setDescription('The notes API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    app.useGlobalFilters(new exception_interceptor_1.AllExceptionsFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.use(session((0, session_config_1.sessionConfig)(config)));
    app.use(cookieParser(config.getOrThrow('COOKIE_SECRET')));
    app.enableCors({
        origin: config.getOrThrow('ALLOWED_ORIGIN'),
        credentials: true,
        exposedCorsHeaders: ['set-cookie'],
    });
    swagger_1.SwaggerModule.setup('/', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map