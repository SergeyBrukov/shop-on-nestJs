import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {PrismaService} from "../prisma/prisma.service";
import {FilesService} from "../files/files.service";

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, FilesService]
})
export class ProductModule {}
