import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("SECRET_JTW"),
        signOptions: {
          expiresIn: configService.get<string>("EXPIRE_IN")
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
