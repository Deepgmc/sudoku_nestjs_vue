import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { IUser, IUsersCreateDTO } from '../interfaces/user.interface';

import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async registerNewUser(user: CreateUserDto): Promise<any>{
        user.password = await this.getPasswordHash(user.password)
        const creationResult = await this.usersService.create(user)
        if(!creationResult) throw new BadRequestException(['Can not create with that login-email'])
    }

    async getPasswordHash(password: string): Promise<string>{
        return new Promise((resolve) => {
            bcrypt.hash(password, 5, function(err, hash) {
                resolve(hash)
            });
        })
    }

    async validateAndGetUser(username: string, password: string): Promise<any> {
        const user = await this.getAndCheckUser(username)
        return new Promise((resolve) => {
            bcrypt.compare(password, user.password, function(err, compareResult) {
                if(compareResult){
                    const { password, ...result } = user
                    //console.log('ValidateAndGetUser user:', user)
                    resolve(result)
                }
                resolve(null)
            });
        })
    }

    /**
     * Function for jwt passport strategy login system
     * @param user
     * @returns jwt access token
     */
    loginJwt(user: IUser){
        const payload = {
            username: user.username,
            sub: user.userId,
            loginJwtData: 'auth.service.ts -> loginJwt()'
        }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async getAndCheckUser(username: string): Promise<IUsersCreateDTO> {
        const user = await this.usersService.findOne('username', username)
        if(!user) throw new UnauthorizedException('Not found such user')
        return user
    }

}
