import {Body, Controller, Get, HttpCode, Post, Req, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiBody, ApiResponse, ApiTags, OmitType, PickType} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {ResponseAuthUserDto} from "./dto/response-auth-user.dto";
import {LoginUserDto} from "../user/dto/login-user.dto";
import {JwtAuthGuard} from "../guard/jwt-auth.guard";
import {AuthGuard} from "@nestjs/passport";

@ApiTags("auth")
@Controller("auth")
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {
  }

  // @Get("google")
  // @UseGuards(AuthGuard("google"))
  // async googleLogin() {
  // }
  //
  // @Get("google/callback")
  // @UseGuards(AuthGuard("google"))
  // async callback (@Req() req) {
  //   console.log(req.user);
  // }

  @Post("google")
  @ApiBody({
    type: OmitType<CreateUserDto, "password">
  })
  @HttpCode(200)
  private googleAuth(@Body() data: Omit<CreateUserDto, "password">) {
    return this.authService.googleAuth(data)
  }


  @Post("registration")
  @ApiBody({
    type: CreateUserDto
  })
  @ApiResponse({
    type: ResponseAuthUserDto
  })
  private registration(@Body() data: CreateUserDto) {
    return this.authService.registration(data);
  }

  @Post("login")
  @HttpCode(200)
  @ApiBody({
    type: LoginUserDto
  })
  @ApiResponse({
    type: ResponseAuthUserDto
  })
  private login(@Body() data: LoginUserDto) {
    return this.authService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  @ApiBearerAuth()
  @ApiResponse({
    type: ResponseAuthUserDto
  })
  private profile(@Req() req) {
    return this.authService.profile(req.user);
  }
}
