import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {UserModule} from "../user/user.module";
import {TokenModule} from "../token/token.module";
import {GoogleStrategy} from "../strategy/google.strategy";

@Module({
  imports: [
    UserModule,
    TokenModule
  ],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController]
})
export class AuthModule {
}
