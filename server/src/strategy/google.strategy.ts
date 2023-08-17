import {PassportStrategy} from "@nestjs/passport";
import {ConfigService} from "@nestjs/config";
import {Strategy, VerifyCallback} from "passport-google-oauth20";
import {Injectable} from "@nestjs/common";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>("googleClientID"),
      clientSecret: configService.get<string>("googleClientSecret"),
      callbackURL: configService.get<string>("googleCallBackURL"),
      scope: ['email', 'profile']
    });
  }

  async validate (accessToken:string,refreshToken: string, done: VerifyCallback, profile: any) {
    console.log(profile);
    done(null, profile)
  }
}