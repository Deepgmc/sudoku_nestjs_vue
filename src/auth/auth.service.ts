import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService
    ) {}

    async validateAndGetUser(name: string, password: string): Promise<any> {
        const user = await this.getAndCheckUser(name)
        if(user && user.password === password){
            const { password, ...result } = user;
            return result
        }
        return null
    }

    async getAndCheckUser(name: string): Promise<IUser> {
        const user = await this.usersService.findOne(name)
        if(user === null) throw new UnauthorizedException('Not found such user')
        return user
    }


}
