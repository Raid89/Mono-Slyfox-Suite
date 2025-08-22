"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_config_1 = require("./config/swagger.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:4200', 'https://suite.slyfox.com.co'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    app.setGlobalPrefix('api/v1');
    (0, swagger_config_1.setupSwagger)(app);
    await app.listen(3000);
}
void bootstrap();
//# sourceMappingURL=main.js.map