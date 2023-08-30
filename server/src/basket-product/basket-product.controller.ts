import {Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards} from "@nestjs/common";
import {BasketProductService} from "./basket-product.service";
import {CreateBasketProductDto} from "./dto/create-basket-product.dto";
import {UpdateBasketProductDto} from "./dto/update-basket-product.dto";
import {ApiBearerAuth, ApiBody, ApiParam, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../guard/jwt-auth.guard";
import {AuthGuard} from "@nestjs/passport";

@ApiTags("basket-product")
@Controller("basket-product")
export class BasketProductController {
  constructor(private readonly basketProductService: BasketProductService) {
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: CreateBasketProductDto
  })
  create(@Body() createBasketProductDto: CreateBasketProductDto, @Req() req) {
    return this.basketProductService.create(createBasketProductDto, req.user);
  }

  @Get()
  findAll() {
    return this.basketProductService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.basketProductService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBasketProductDto: UpdateBasketProductDto) {
    return this.basketProductService.update(+id, updateBasketProductDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param("id") id: string, @Req() req) {
    return this.basketProductService.remove(+id, req.user);
  }
}
