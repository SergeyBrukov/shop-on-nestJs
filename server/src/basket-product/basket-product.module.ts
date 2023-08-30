import { Module } from '@nestjs/common';
import { BasketProductService } from './basket-product.service';
import { BasketProductController } from './basket-product.controller';
import {PrismaService} from "../prisma/prisma.service";

@Module({
  controllers: [BasketProductController],
  providers: [BasketProductService, PrismaService]
})
export class BasketProductModule {}
