import { IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';
import { UUID } from 'crypto';

export class CreateOrderDto {
  /**
   * Array de Ids de products
   * @example [bf9a36ba-363e-4a24-9a11-84a96b3a901e]
   */
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  products: UUID[];
}
