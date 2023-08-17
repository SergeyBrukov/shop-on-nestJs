import {BadRequestException, Injectable} from "@nestjs/common";
import {CreateProductDto} from "./dto/create-product.dto";
import {UpdateProductDto} from "./dto/update-product.dto";
import {PrismaService} from "../prisma/prisma.service";
import {FilesService} from "../files/files.service";
import {PRODUCT_EXIST} from "../common/errors";

@Injectable()
export class ProductService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FilesService
  ) {
  }

  public async createProduct(createProductDto: CreateProductDto, images: Express.Multer.File[]) {

    const {articul, new: productNew, name, categories, bestseller, producerId, price} = createProductDto;

    const candidateProduct = await this.examinationProductUnique({
      name,
      articul
    });


    if (candidateProduct) {
      throw new BadRequestException(PRODUCT_EXIST);
    }

    let productImages = [];

    const processImages = async (images: Express.Multer.File[]) => {
      for (let image of images) {
        this.fileService.generateFileNameAndPath(image);
        await this.fileService.saveFileInDirectory(image);

        productImages.push({
          fileName: image.filename,
          filePath: image.path
        });
      }
    };

    await processImages(images);


    const product = await this.prismaService.product.create({
      data: {
        name,
        articul,
        new: Boolean(productNew),
        bestseller: Boolean(bestseller),
        producer: {
          connect: {
            id: Number(producerId)
          }
        },
        price,
        image: {
          create: productImages.map(image => ({
            fileName: image.fileName,
            filePath: image.filePath
          }))
        },
        categories: Number(categories)
      },
      include: {
        image: true
      }
    });
    console.log(product, productImages);

    return {product};
  }

  public async findAllProduct() {
    return this.prismaService.product.findMany({
      include: {
        image: true
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  private async examinationProductUnique({name, articul}: { name: string, articul: string }) {
    const examinationName = await this.prismaService.product.findUnique({
      where: {
        name
      }
    });

    const examinationArticul = await this.prismaService.product.findUnique({
      where: {
        articul
      }
    });

    return examinationName || examinationArticul;

  }
}
