import { IsNotEmpty, IsUUID, IsArray } from 'class-validator';
import { v4 as uuid } from 'uuid';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  userId: uuid;

  @IsArray()
  @IsNotEmpty()
  products: { id: uuid }[];
}
