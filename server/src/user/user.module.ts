import {Module} from "@nestjs/common";
import {UserService} from "./user.service";
import {PrismaService} from "../prisma/prisma.service";
import {MailingService} from "../mailing/mailing.service";

@Module({
  providers: [UserService, PrismaService, MailingService],
  controllers: [],
  exports: [UserService]
})
export class UserModule {
}
