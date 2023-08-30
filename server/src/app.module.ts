import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {PrismaService} from "./prisma/prisma.service";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user.module";
import {TokenModule} from "./token/token.module";
import {JwtStrategy} from "./strategy/jwt.strategy";
import { ProducerModule } from './producer/producer.module';
import { FilesService } from './files/files.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { BasketModule } from './basket/basket.module';
import { OrdersModule } from './orders/orders.module';
import { BasketProductModule } from './basket-product/basket-product.module';
import configuration from "./configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    AuthModule,
    UserModule,
    TokenModule,
    ProducerModule,
    CategoryModule,
    ProductModule,
    BasketModule,
    OrdersModule,
    BasketProductModule
  ],
  controllers: [],
  providers: [PrismaService, JwtStrategy, FilesService]
})
export class AppModule {
}
