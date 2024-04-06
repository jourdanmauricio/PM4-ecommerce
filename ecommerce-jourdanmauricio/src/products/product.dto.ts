import { PartialType } from '@nestjs/mapped-types';
import { v4 as uuid } from 'uuid';
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
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

  @IsPositive()
  @IsNotEmpty()
  readonly stock: number;

  @IsUrl()
  @IsOptional()
  readonly imgUrl?: string;

  @IsUUID()
  @IsNotEmpty()
  readonly categoryId: uuid;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  page: number;
}
