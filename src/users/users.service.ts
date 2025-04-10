import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UsersEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { TUserId } from '../interfaces/user.interface';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersEntity)//тут под капотом делается const userRepository = MyDataSource.getRepository(User)
        private usersRepository: Repository<UsersEntity>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<CreateUserDto | boolean> {
        if(
            //check if already have such login/email
            await this.usersRepository.existsBy([{'username': createUserDto.username}, {'email': createUserDto.email}])
        ){
            return false
        }
        return await this.usersRepository.save(createUserDto)
    }

    /**
     * Searches the unique user with the unique id or login or email
     * @param field userId, username, email
     * @param value id or string
     * @returns
     */
    async findOne(field: string, value: string | number): Promise<UsersEntity | null> {
        try{
            const searchObject = {
                [field]: value
            }
            return await this.usersRepository.findOneBy(searchObject)
        } catch(_e: any){
            throw new NotFoundException()
        }

    }

    async getGameSettings(userId: TUserId): Promise<string> {
        const user = await this.findOne('userId', userId)
        if(user !== null){
            return user.game_settings
        }
        return ''
    }

    /**
     * Just all users without conditions
     * @returns users array
     */
    async findAll(): Promise<UsersEntity[]> {
        return await this.usersRepository.find()
    }
}
