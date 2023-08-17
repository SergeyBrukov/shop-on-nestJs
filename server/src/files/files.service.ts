import {Injectable} from "@nestjs/common";
import * as path from "path";
import * as fsPromise from "fs/promises";
import {PrismaService} from "../prisma/prisma.service";
import {generatedId} from "./storage";

@Injectable()
export class FilesService {

  constructor(
    private readonly prismaService: PrismaService
  ) {
  }

  public generateFileNameAndPath(file: Express.Multer.File) {
    const fileExtName = file.originalname.split(".").pop();

    file.filename = `${generatedId()}.${fileExtName}`
    file.path = `uploads/${file.filename}`

    return file
  }

  public async saveFileInDirectory(file: Express.Multer.File) {
    const filePath = path.join(__dirname,  "../../uploads", file.filename);

   await fsPromise.writeFile(filePath, file.buffer);

  }


  public async deleteFilesByDirectory(filePath: string) {
    const absolutePath = path.join(__dirname, "../../uploads", filePath);

    await fsPromise.unlink(absolutePath);
  }

  public findFileInDB(fileId: number) {
    return this.prismaService.files.findUnique({
      where: {
        id: fileId
      }
    });
  }
}
