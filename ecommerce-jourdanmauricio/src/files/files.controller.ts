import {
  Controller,
  FileTypeValidator,
  InternalServerErrorException,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './../products/products.service';
import { v4 as uuid } from 'uuid';
import { AuthGuard } from './../guards/auth.guard';

@Controller('files')
@UseGuards(AuthGuard)
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private productsService: ProductsService,
  ) {}

  @Put('uploadImage/:id')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProductImage(
    @Param('id', ParseUUIDPipe) id: uuid,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: `El archivo debe ser menor a 200kb`,
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const image = await this.filesService.uploadImage(file);
    if (!image)
      throw new InternalServerErrorException('Error cargando la imagen');

    return await this.productsService.update(id, {
      imgUrl: image.secure_url,
    });
  }
}
