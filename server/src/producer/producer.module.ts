import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ProducerController } from './producer.controller';
import {PrismaService} from "../prisma/prisma.service";
import {FilesService} from "../files/files.service";

@Module({
  providers: [ProducerService, PrismaService, FilesService],
  controllers: [ProducerController]
})
export class ProducerModule {}
