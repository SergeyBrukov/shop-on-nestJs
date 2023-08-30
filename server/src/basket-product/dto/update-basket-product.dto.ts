import { PartialType } from '@nestjs/swagger';
import { CreateBasketProductDto } from './create-basket-product.dto';

export class UpdateBasketProductDto extends PartialType(CreateBasketProductDto) {}
