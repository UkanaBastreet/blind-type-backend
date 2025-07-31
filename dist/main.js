"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const exception_interceptor_1 = require("./exception.interceptor");
const app_module_1 = require("./app.module");
const cors_config_1 = require("./.config/cors.config");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const APPLICATION_PORT = config.getOrThrow('APPLICATION_PORT');
    app.useGlobalFilters(new exception_interceptor_1.AllExceptionsFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.enableCors((0, cors_config_1.corsConfig)(config));
    const swaggerConfig = new swagger_1.DocumentBuilder().setTitle('BlindType Api').build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, documentFactory, {
        customSiteTitle: 'BlindType API',
        customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@3/swagger-ui.css',
        customJs: [
            'https://cdn.jsdelivr.net/npm/swagger-ui-dist@3/swagger-ui-bundle.js',
            'https://cdn.jsdelivr.net/npm/swagger-ui-dist@3/swagger-ui-standalone-preset.js',
        ],
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    await app.listen(APPLICATION_PORT, () => console.log('App running at port: ' + APPLICATION_PORT));
}
bootstrap();
//# sourceMappingURL=main.js.map