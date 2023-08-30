import {Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {TokenService} from "../token/token.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {ResponseAuthUserDto} from "./dto/response-auth-user.dto";
import {LoginUserDto} from "../user/dto/login-user.dto";
import {BasketService} from "../basket/basket.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly basketService: BasketService
  ) {
  }

  public async googleAuth(userData: { email: string, name: string }) {
    const user = await this.userService.googleAuthUser(userData);

    const token = this.tokenService.generateJwtToken(user);

    return {
      user,
      token
    };
  }

  public async registration(userData: CreateUserDto) {
    const user = await this.userService.createUser(userData);
    const token = this.tokenService.generateJwtToken(user);

    return {
      user,
      token
    };
  }

  public async login(userData: LoginUserDto) {
    const user = await this.userService.login(userData);
    const token = this.tokenService.generateJwtToken(user);

    return {
      user,
      token
    };
  }

  public async profile(user: ResponseAuthUserDto) {
    const basket = await this.basketService.findOne(user.basket.id);

    return {user: {...user, basket}};
  }
}
