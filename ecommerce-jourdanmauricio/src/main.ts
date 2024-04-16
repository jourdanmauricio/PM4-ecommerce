import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminUserSeeder } from './data/usersSeeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);
  // Interceptor en la configuración global (@Exclude)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Activamos validaciones de class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      // Elimina del payload los atributos que no esten definidos en el dto
      whitelist: true,
      // Rechaza la petición indicando que se envía un atributo que no es esperado
      forbidNonWhitelisted: true,
    }),
  );

  // Configuración de Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('PM4 - e-commerce ')
    .setDescription(
      'Esta API pertenece al módulo 4 (especialidad backend) del bootcamp Full Stack Developer de Henry y se enfoca en funcionalidades relacionadas con un e-commerce. Permite la gestión de productos, categorías, usuarios, pedidos y otras operaciones esenciales para el funcionamiento de una tienda online.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const seeder = app.get<AdminUserSeeder>(AdminUserSeeder);
  await seeder.runAdmin();
  await seeder.runCustomers();
  await seeder.runTestCustomer();

  await app.listen(3000);
}
bootstrap();
