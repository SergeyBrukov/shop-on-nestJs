import {BadRequestException, Injectable} from "@nestjs/common";
import {CreateBasketProductDto} from "./dto/create-basket-product.dto";
import {UpdateBasketProductDto} from "./dto/update-basket-product.dto";
import {PrismaService} from "../prisma/prisma.service";
import {BASKET_PRODUCT_EXIST, BASKET_PRODUCT_REMOVED} from "../common/errors";

@Injectable()
export class BasketProductService {

  constructor(
    private readonly prismaService: PrismaService
  ) {
  }

  public async create(createBasketProductDto: CreateBasketProductDto, user) {

    const thisProductInToUserBasket = await this.examinationProductIdInToBasketByUser(user.basket.id, createBasketProductDto.productId);

    if (thisProductInToUserBasket.length > 0) {
      throw new BadRequestException(BASKET_PRODUCT_EXIST);
    }

    await this.prismaService.basketProduct.create({
      data: {
        product: {
          connect: {
            id: createBasketProductDto.productId
          }
        },
        basket: {
          connect: {
            id: user.basket.id
          }
        }
      }
    });

    return "This action adds a new basketProduct";
  }

  findAll() {
    return `This action returns all basketProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basketProduct`;
  }

  update(id: number, updateBasketProductDto: UpdateBasketProductDto) {
    return `This action updates a #${id} basketProduct`;
  }

  public async remove(productId: number, user) {

    const thisProductInToUserBasket = await this.examinationProductIdInToBasketByUser(user.basket.id, productId);

    if (thisProductInToUserBasket.length === 0) {
      throw new BadRequestException(BASKET_PRODUCT_REMOVED);
    }

    await this.prismaService.basketProduct.delete({
      where: {
        id: thisProductInToUserBasket[0].id,
        basketId: user.basket.id,
        productId: productId
      }
    });

    return `This action removes a #${productId} basketProduct`;
  }

  private async examinationProductIdInToBasketByUser(userBasketId: number, productId: number) {
    const userBasket = await this.prismaService.basket.findUnique({
      where: {
        id: userBasketId
      },
      include: {
        products: {
          where: {
            productId
          }
        }
      }
    });

    return userBasket.products;
  }
}
