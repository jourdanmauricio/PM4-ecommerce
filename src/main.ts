import { CategoriesService } from './categories/categories.service';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserSeeder } from './data/usersSeeder';
import { ProductsService } from './products/products.service';

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

  await app.listen(process.env.PORT);

  console.log(`Server listen on ${process.env.HOST}:${process.env.PORT}`);
  console.log('Users Seeders');
  const userSeeders = app.get<UserSeeder>(UserSeeder);
  await userSeeders.runAdmin();
  await userSeeders.runCustomers();
  await userSeeders.runTestCustomer();

  console.log('Categories Seeders');
  const categoriesSeeder = app.get<CategoriesService>(CategoriesService);
  await categoriesSeeder.preLoadCategories();

  console.log('Products Seeders');
  const productsSeeder = app.get<ProductsService>(ProductsService);
  await productsSeeder.preLoadProducts();
}
bootstrap();
