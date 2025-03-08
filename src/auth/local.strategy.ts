import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { IUser } from '../interfaces/user.interface'

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
        username: string,
        password: string
    ): Promise<IUser>  {
        const user = await this.authService.validateAndGetUser(username, password)
        if(!user){
            console.log('Local strategy have not found user with:', username, password);
            throw new UnauthorizedException()
        }
        user.additional_data = {role: 'admin'}

        return user
    }
}