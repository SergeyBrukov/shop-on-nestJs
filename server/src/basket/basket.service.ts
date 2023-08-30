import { Injectable } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import {PrismaService} from "../prisma/prisma.service";
import {use} from "passport";

@Injectable()
export class BasketService {

  constructor(
    private readonly prismaService: PrismaService
  ) {
  }

  create(createBasketDto: CreateBasketDto) {
    return 'This action adds a new basket';
  }

  findAll() {
    return `This action returns all basket`;
  }

  public async getDetailsBasketMethod(user) {
    const basket = await  this.prismaService.basket.findUnique({
      where: {
        id: user.basket.id
      },
      select: {
        products: {
          select: {
            id: true,
            count: true,
            product: {
              select: {
                id: true,
                name: true,
                new: true,
                bestseller: true,
                price: true,
                articul: true,
                category: {
                  select: {
                    id: true,
                    name: true
                  }
                },
                producer: {
                  select: {
                    id: true,
                    name: true
                  }
                },
                image: {
                  select: {
                    filePath: true,
                    fileName: true
                  },
                  take: 1
                }
              }
            }
          }
        }
      }
    })

    return {basket: basket.products}
  }

  public findOne(id: number) {
    return this.prismaService.basket.findUnique({
      where: {
        id
      },
      include: {
        products: {
          select: {
            productId: true,
            count: true
          }
        }
      }
    });
  }

  update(id: number, updateBasketDto: UpdateBasketDto) {
    return `This action updates a #${id} basket`;
  }

  remove(id: number) {
    return `This action removes a #${id} basket`;
  }
}
