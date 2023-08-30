import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes
} from "@nestjs/common";
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {ProducerService} from "./producer.service";
import {JwtAuthGuard} from "../guard/jwt-auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {FileSizeValidationPipe} from "../files/FileValidator";
import {CreateProducerDto} from "./dto/create-producer.dto";
import {memoryStorage} from "multer";

@ApiTags("producer")
@Controller("producer")
export class ProducerController {
  constructor(
    private readonly producerService: ProducerService
  ) {
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UsePipes(new FileSizeValidationPipe(1024 * 1024 * 5))
  @UseInterceptors(
    FileInterceptor("image", {
      limits: {
        fileSize: 1024 * 1024 * 5
      },
      storage: memoryStorage()
    })
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: CreateProducerDto
  })
  createProducer(@Body() data: Omit<CreateProducerDto, "image">, @UploadedFile() image: Express.Multer.File) {
    return this.producerService.createProducer(image, data.name);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getProducers() {
    return this.producerService.getProducers();
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deleteProducer(@Param("id") producerName: string) {
    return this.producerService.deleteProducer(producerName);
  }
}
