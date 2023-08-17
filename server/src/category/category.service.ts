import {BadRequestException, Injectable} from "@nestjs/common";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {PrismaService} from "../prisma/prisma.service";
import {CATEGORY_EXIST, CATEGORY_NOT_EXIST} from "../common/errors";

@Injectable()
export class CategoryService {

  constructor(
    private readonly prismaService: PrismaService
  ) {
  }


  public async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.findCategory(createCategoryDto.name);

    if (category) {
      throw new BadRequestException(CATEGORY_EXIST);
    }

    return this.prismaService.category.create({
      data: {
        name: createCategoryDto.name
      }
    });
  }

  public getAllCategory() {
    return this.prismaService.category.findMany();
  }


  public async deleteCategory(name: string) {
    const category = await this.findCategory(name);

    if (!category) {
      throw new BadRequestException(CATEGORY_NOT_EXIST);
    }

    await this.prismaService.category.delete({
      where: {
        name
      }
    });

    return {
      message: `You remove ${category.name} category`
    };

  }

  public async updateCategory(name: string, updateName: string) {
    const category = await this.findCategory(name);

    if (!category) {
      throw new BadRequestException(CATEGORY_NOT_EXIST);
    }

    await this.prismaService.category.update({
      where: {
        name
      },
      data: {
        name: updateName
      }
    });

    return {
      message: `Category ${category.name} updated`
    };

  }

  private async findCategory(name: string) {
    return this.prismaService.category.findUnique({
      where: {
        name
      }
    });
  }
}
