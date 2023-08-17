import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
    }

    public generateJwtToken(user) {
        const token = this.jwtService.sign({user}, {
            secret: this.configService.get<string>("secretJwt"),
            expiresIn: this.configService.get<string>("expiresIn")
        })

        return token
    }
}
