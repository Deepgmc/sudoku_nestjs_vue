import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from '@nestjs/common'
import { jwtConstants } from "../config/auth.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        })
    }

    validate(payload: any){
        //console.log('JWT strategy validate payload:', payload);
        return {
            userId: payload.sub,
            username: payload.username,
            loginJwtData: payload.loginJwtData,
            someStrategyData: 'jwt.strategy.ts -> validate()'
        }
    }
}