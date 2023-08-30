import {Injectable} from "@nestjs/common";
import {CreateOrderDto} from "./dto/create-order.dto";
import {UpdateOrderDto} from "./dto/update-order.dto";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class OrdersService {

  constructor(
    private readonly prismaService: PrismaService
  ) {
  }

  public async create(createOrderDto: CreateOrderDto, user) {

    await this.prismaService.orders.create({
      data: {
        userId: user.id,
        orderPrice: createOrderDto.totalPrice,
        orderProducts: {
          create: createOrderDto.orderProducts.map(orderProduct => {
            return {
              productId: orderProduct.id,
              count: orderProduct.count
            };
          })
        }
      }
    });

    await this.prismaService.basketProduct.deleteMany({
      where: {
        basketId: user.basketId
      }
    });

    return {message: "Order created successfully"};
  }

  findAll() {
    return `This action returns all orders`;
  }

  public async findOne(id: number) {

    const order = await this.prismaService.orders.findUnique({
      where: {
        id
      },
      select: {
        orderPrice: true,
        orderProducts: {
          select: {
            count: true,
            product: true
          }
        }
      }
    });

    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
