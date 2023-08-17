import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from "@nestjs/common";
import {CategoryService} from "./category.service";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {ApiBearerAuth, ApiBody, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../guard/jwt-auth.guard";
import {UpdateCategoryDto} from "./dto/update-category.dto";

@ApiTags("category")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: CreateCategoryDto
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getAllCategory() {
    return this.categoryService.getAllCategory();
  }

  @Delete(":name")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deleteCategory(@Param("name") name: string) {
    return this.categoryService.deleteCategory(name);
  }

  @Patch(":name")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateCategory(@Param("name") name: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(name, updateCategoryDto.name);
  }
}
