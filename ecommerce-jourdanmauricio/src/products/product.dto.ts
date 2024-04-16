import { PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { UUID } from 'crypto';

export class CreateProductDto {
  /**
   * El nombre del producto debe ser una cadena de texto, máximo 50 caracteres
   * @example 'Iphone 15'
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly name: string;

  /**
   * La descripción del producto debe ser una cadena de texto no nula
   * @example 'The best smartphone in the world'
   */
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  /**
   * El precio debe ser un número positivo
   * @example 100
   */
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  /**
   * El stock debe ser un número positivo
   * @example 10
   */
  @IsPositive()
  @IsNotEmpty()
  readonly stock: number;

  /**
   * La imagen debe ser una url y es opcional
   * @example https://res.cloudinary.com/dn7npxeof/image/upload/v1712238917/Henry/PM4-ecommerce/Sin_imagen_disponible_zxruow.webp
   */
  @IsUrl()
  @IsOptional()
  readonly imgUrl?: string;

  /**
   * Id de la categoría del producto, es obligatoria
   * @example bf9a36ba-363e-4a24-9a11-84a96b3a901e
   */
  @IsUUID()
  @IsNotEmpty()
  readonly categoryId: UUID;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

// export class FilterProductDto {
//   @IsOptional()
//   @IsPositive()
//   limit: number;

//   @IsOptional()
//   @IsPositive()
//   page: number;
// }
