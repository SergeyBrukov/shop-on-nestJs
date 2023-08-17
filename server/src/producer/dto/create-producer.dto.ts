import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";

export class CreateProducerDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;

  @ApiProperty()
  @IsString()
  @MaxLength(10, { message: 'Name cannot exceed 10 characters' })
  name: string;
}