import {ApiProperty} from "@nestjs/swagger";

export class CreateBasketProductDto {
  @ApiProperty()
  productId: number
}
