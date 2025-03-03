import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { IUser } from '../interfaces/user.interface';

import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async registerNewUser(user: CreateUserDto): Promise<any>{
        user.password = await this.getPasswordHash(user.password)
        return await this.usersService.create(user)
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
        if(user){
            return new Promise((resolve) => {
                bcrypt.compare(password, user.password, function(err, compareResult) {
                    if(compareResult){
                        const { password, ...result } = user
                        console.log('ValidateAndGetUser user:', user)
                        resolve(result)
                    }
                    resolve(null)
                });
            })
        }
        return Promise.resolve(null)
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
