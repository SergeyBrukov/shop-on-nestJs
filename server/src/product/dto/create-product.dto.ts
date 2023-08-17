import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNumber, IsString} from "class-validator";

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  // @IsBoolean()
  bestseller: boolean;

  @ApiProperty()
  // @IsBoolean()
  new: boolean;

  @ApiProperty()
  @IsString()
  articul: string;

  @ApiProperty()
  @IsString()
  price: string;

  @ApiProperty()
  // @IsNumber()
  producerId: number;

  @ApiProperty({type: "array", items: {type: "string", format: "binary"}})
  images: any;

  @ApiProperty()
  // @IsNumber()
  categories: number;
}
