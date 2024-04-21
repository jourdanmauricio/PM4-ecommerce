import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsInt,
  MinLength,
  MaxLength,
  Matches,
  Validate,
  IsEmpty,
} from 'class-validator';
import { ApiHideProperty, PartialType } from '@nestjs/swagger';

import { MatchPass } from './../decorators/MatchPass.decorator';

export class CreateUserDto {
  /**
   * El nombre del usuario debe tener como mínimo 3 caracteres
   * @example Paola
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly name: string;

  /**
   * El email del usuario debe ser un email válido
   * @example jourdanpao@mail.com
   */
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  /**
   * No utlices información personal ni compartas tu contraseña
   * @example Aa$12345678
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
  readonly password: string;

  /**
   * No utlices información personal ni compartas tu contraseña
   * @example Aa$12345678
   */
  @IsString()
  @IsNotEmpty()
  @Validate(MatchPass, ['password'])
  readonly confPassword: string;

  /**
   * Dirección: mínimo 3, máximo 80 cracteres
   * @example Diagonal 74 número 1825
   */
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @IsOptional()
  readonly address: string;

  /**
   * Número de teléfono: Debe ser numérico
   * @example 1145454545
   */
  @IsInt()
  @IsNotEmpty()
  readonly phone: number;

  /**
   * País: mínimo: 5, máximo: 20
   * @example Argentina
   */
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(20)
  readonly country?: string;

  /**
   * Ciudad: mínimo: 5, máximo: 20
   * @example La Plata
   */
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(20)
  readonly city?: string;

  /**
   * Administrador: No de debe enviar
   * @example false
   */
  @IsEmpty()
  @ApiHideProperty()
  isAdmin: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class LoginUserDto {
  /**
   * El email del usuario debe ser un email válido
   * @example 'jourdanpao@mail.com'
   */
  @IsNotEmpty()
  email: string;
  /**
   * No utlices información personal ni compartas tu contraseña
   * @example 'Aa$12345678'
   */
  @IsNotEmpty()
  password: string;
}
