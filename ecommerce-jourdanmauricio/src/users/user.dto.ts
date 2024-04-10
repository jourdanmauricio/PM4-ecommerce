import { PartialType, PickType } from '@nestjs/mapped-types';

import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsInt,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly confPassword: string;

  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @IsOptional()
  readonly address: string;

  @IsInt()
  @IsNotEmpty()
  readonly phone: number;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(20)
  readonly country?: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(20)
  readonly city?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
