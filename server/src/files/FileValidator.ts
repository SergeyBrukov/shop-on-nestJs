import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  constructor(private readonly maxSize: number) {}

  transform(value: any) {
    if (value.fieldname === "file" && value.size > this.maxSize) {
      throw new BadRequestException('File size is too large');
    }
    return value;
  }
}