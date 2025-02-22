import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
//? вызывается как <name>Strategy ---- AuthGuard('local')
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private authService: AuthService
    ){
        super()
    }

    /**
     * Nestjs Passport validate должен возвращать объект юзера и можно добавлять всякую доп. инфу
     * @param name
     * @param password
     * @returns IUser
     */
    async validate(
        name: string,
        password: string
    ): Promise<any>  {
        console.log('Local strategy validate');
        const user = await this.authService.validateAndGetUser(name, password)
        user.additional_data = {role: 'admin'}
        if(!user){
            throw new UnauthorizedException()
        }
        return user
    }
}