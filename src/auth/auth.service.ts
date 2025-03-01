import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { IUser } from '../interfaces/user.interface';

import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    registerNewUser(user: CreateUserDto){
        const newUser = new CreateUserDto(user)
        console.log('newUser at auth service:', newUser)
    }

    async validateAndGetUser(username: string, password: string): Promise<any> {
        const user = await this.getAndCheckUser(username)
        if(user && user.password === password){
            const { password, ...result } = user
            console.log('ValidateAndGetUser user:', user);
            return result
        }
        return null
    }

    login(user: any){
        const payload = {username: user.username, sub: user.userId}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async getAndCheckUser(username: string): Promise<IUser> {
        const user = await this.usersService.findOne(username)
        if(user === null) throw new UnauthorizedException('Not found such user')
        return user
    }

}
