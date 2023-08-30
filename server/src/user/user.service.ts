import * as bcrypt from "bcrypt";
import {BadRequestException, Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {INVALID_DATA, USER_EXIST, USER_NOT_EXIST} from "../common/errors";
import {LoginUserDto} from "./dto/login-user.dto";
import {MailingService} from "../mailing/mailing.service";

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailingService: MailingService
  ) {
  }


  public async googleAuthUser(userData: { email: string, name: string }) {
    const user = await this.examinationUser(userData.email);

    if (!user) {
      const randomPassword = "123456789";

      const newUser = await this.createUser({...userData, password: randomPassword}, "google");

      return newUser;
    }
    delete user.password;

    return user;
  }

  public async createUser(userData: CreateUserDto, type?: string) {
    const candidate = await this.examinationUser(userData.email);

    if (candidate) {
      throw new BadRequestException(USER_EXIST);
    }

    const hashPassword = await this.hashPassword(userData.password);

    const newUser = await this.prismaService.user.create({
      data: {
        ...userData,
        password: hashPassword,
        basket: {
          create: {}
        }
      },
      include: {
        basket: {
          select: {
            id: true,
            products: true
          }
        }
      }
    });

    const to = userData.email;
    const subject = "Hello!";
    const template = "registerEmail";
    let context = {name: userData.name};

    if (type === "google") {
      context["googlePassword"] = `Bro you has been registration with the help of Google, and we generate password for you - ${userData.password}`;
    }

    await this.mailingService.sendEmail(to, subject, template, context);

    delete newUser.password;

    return {
      id: newUser.id,
      ...newUser
    };
  }

  public async login(userData: LoginUserDto) {
    const user = await this.examinationUser(userData.email);
    if (!user) {
      throw new BadRequestException(USER_NOT_EXIST);
    }

    const comparePassword = await bcrypt.compare(userData.password, user.password);

    if (!comparePassword) {
      throw new BadRequestException(INVALID_DATA);
    }

    delete user.password;

    return user;
  }

  private async examinationUser(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        basket: {
          select: {
            id: true,
            products: true
          }
        }
      }
    });
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();

    return bcrypt.hash(password, salt);
  }
}
