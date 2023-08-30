import {ApiProperty} from "@nestjs/swagger";

export class CreateOrderDto {
  @ApiProperty({type: "array", items: {type: "object"}})
  orderProducts: any;

  @ApiProperty()
  totalPrice: number
}
