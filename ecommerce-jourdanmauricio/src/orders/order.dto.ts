import { IsNotEmpty, IsUUID, IsArray, ArrayMinSize } from 'class-validator';
import { UUID } from 'crypto';

export class CreateOrderDto {
  /**
   * Id del usuario, es obligatorio
   * @example bf9a36ba-363e-4a24-9a11-84a96b3a901e
   */
  @IsUUID()
  @IsNotEmpty()
  userId: UUID;

  /**
   * Array de Ids de products
   * @example [bf9a36ba-363e-4a24-9a11-84a96b3a901e]
   */
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  products: { id: UUID }[];
}
