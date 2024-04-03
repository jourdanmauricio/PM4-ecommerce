import { PartialType, OmitType } from '@nestjs/mapped-types';

import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsBoolean,
  IsOptional,
  // Min,
} from 'class-validator';
// isEmail, isDate, etc

export class Product {
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly stock: boolean;

  @IsUrl()
  @IsNotEmpty()
  readonly imgUrl: string;
}

export class CreateProductDto extends OmitType(Product, ['id']) {}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  page: number;
}
