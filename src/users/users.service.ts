import { Injectable, NotFoundException } from '@nestjs/common';
import { TUserId, IUser } from '../interfaces/user.interface';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersEntity)//тут под капотом делается const userRepository = MyDataSource.getRepository(User)
        private usersRepository: Repository<UsersEntity>,
    ) {}

    async findAll(): Promise<UsersEntity[]> {
        const users = await this.usersRepository.find()
        return users;
    }

    async findOne(fieldValue: number | string): Promise<any> {
        let fieldName: string
        if(typeof fieldValue === 'string'){
            fieldName = 'username'
        } else {
            fieldName = 'userId'
        }
        const searchObject = {
            [fieldName]: fieldValue
        }
        const user = await this.usersRepository.findOneBy(searchObject)


        return user
    }
}
