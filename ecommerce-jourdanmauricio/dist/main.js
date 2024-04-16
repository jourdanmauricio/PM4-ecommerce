"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const usersSeeder_1 = require("./data/usersSeeder");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(logger_middleware_1.loggerGlobal);
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('PM4 - e-commerce ')
        .setDescription('Esta API pertenece al módulo 4 (especialidad backend) del bootcamp Full Stack Developer de Henry y se enfoca en funcionalidades relacionadas con un e-commerce. Permite la gestión de productos, categorías, usuarios, pedidos y otras operaciones esenciales para el funcionamiento de una tienda online.')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    const seeder = app.get(usersSeeder_1.AdminUserSeeder);
    await seeder.runAdmin();
    await seeder.runCustomers();
    await seeder.runTestCustomer();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map