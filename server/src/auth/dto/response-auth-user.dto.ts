import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNumber, IsString} from "class-validator";

export class ResponseAuthUserDto {
    @ApiProperty()
    @IsNumber()
    id: number

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    token: string;

    @ApiProperty()
    basket: any
}