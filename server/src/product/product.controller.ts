import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards
} from "@nestjs/common";
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {FilesInterceptor} from "@nestjs/platform-express";
import {memoryStorage} from "multer";
import {JwtAuthGuard} from "../guard/jwt-auth.guard";

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FilesInterceptor('images', 5, {
    limits: {
      fileSize: 1024 * 1024 * 5
    }
  }))
  @ApiBody({
    type: CreateProductDto
  })
  @ApiConsumes("multipart/form-data")
  create(@Body() createProductDto: CreateProductDto, @UploadedFiles() images: Express.Multer.File[]) {

    return this.productService.createProduct(createProductDto, images);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAllProduct() {
    return this.productService.findAllProduct();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
