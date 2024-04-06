import { PartialType } from '@nestjs/mapped-types';

import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsInt()
  @IsNotEmpty()
  readonly phone: number;

  @IsString()
  @IsOptional()
  readonly country?: string;

  @IsString()
  @IsOptional()
  readonly city?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
