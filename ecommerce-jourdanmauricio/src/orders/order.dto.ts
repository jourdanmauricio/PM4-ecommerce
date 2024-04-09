import { IsNotEmpty, IsUUID, IsArray, ArrayMinSize } from 'class-validator';
import { v4 as uuid } from 'uuid';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  userId: uuid;

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  products: { id: uuid }[];
}
