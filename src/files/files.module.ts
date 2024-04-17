import { Module } from '@nestjs/common';
import { CloudinaryConfig } from './../config/cloudinary';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { ProductsModule } from './../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryConfig],
})
export class FilesModule {}
