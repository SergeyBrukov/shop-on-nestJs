import {BadRequestException, Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {PRODUCER_EXIST, PRODUCER_NOT_EXIST} from "../common/errors";
import {FilesService} from "../files/files.service";

@Injectable()
export class ProducerService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly filesService: FilesService
  ) {

  }

  public async createProducer(image: Express.Multer.File, producerName: string) {

    const producer = await this.findProducer("name", producerName);

    if (producer) {
      throw new BadRequestException(PRODUCER_EXIST);
    }

    this.filesService.generateFileNameAndPath(image);

    const newFiles = await this.prismaService.files.create({
      data: {
        fileName: image.filename,
        filePath: image.path
      }
    });

    const newProducer = await this.prismaService.producer.create({
      data: {
        name: producerName,
        image: {
          connect: {
            id: newFiles.id
          }
        }
      }
    });

    await this.filesService.saveFileInDirectory(image);

    return newProducer;
  }

  public async getProducers() {
    // try {
    //   // Використовуємо __dirname для отримання поточної директорії модуля
    //   const imagesFolderPath = path.join(__dirname, "../../uploads");
    //   const files = await fs.readdir(imagesFolderPath);
    //
    //   return {
    //     producers: files
    //   };
    // } catch (error) {
    //   throw new BadRequestException();
    // }
    const producers = await this.prismaService.producer.findMany({
      include: {
        image: {
          select: {
            filePath: true
          }
        }
      }
    });

    return {
      producers
    };

  }

  public async deleteProducer(producerID: string) {
    console.log(producerID, typeof producerID);
    const producer = await this.findProducer("id", Number(producerID));

    if (!producer) {
      throw new BadRequestException(PRODUCER_NOT_EXIST);
    }

    const file = await this.filesService.findFileInDB(producer.filesId);

    if (file) {
      await this.filesService.deleteFilesByDirectory(file.fileName);
    }

    await this.prismaService.producer.delete({
      where: {
        id: producer.id
      }
    });

    await this.prismaService.files.delete({
      where: {
        id: file.id
      }
    });

    return {
      message: `You delete producer ${producer.name}`
    };

  }

  private async findProducer(whereFiled: string, producerValue: string | number) {
    const producer = await this.prismaService.producer.findFirst({
      where: {
        [whereFiled]: producerValue
      }
    });

    return producer;
  }
}