import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UsersEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersEntity)//тут под капотом делается const userRepository = MyDataSource.getRepository(User)
        private usersRepository: Repository<UsersEntity>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<CreateUserDto>{
        return await this.usersRepository.save(createUserDto)
    }

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
