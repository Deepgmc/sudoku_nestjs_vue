import { Injectable } from '@nestjs/common';
import { TUserId, TUserWithoutPassword } from '../interfaces/user.interface';
import { EAppModes } from '../types';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersEntity)//тут под капотом делается const userRepository = MyDataSource.getRepository(User)
        private usersRepository: Repository<UsersEntity>,
    ) {}

    public TYPE: typeof EAppModes = EAppModes;

    //printTypeObject(){console.log(this.TYPE);}

    async findAll(): Promise<UsersEntity[]> {
        const users = await this.usersRepository.find()
        return users;
    }

    findOne(id: TUserId): Promise<TUserWithoutPassword> {
        return Promise.resolve<TUserWithoutPassword>({
            id  : id,
            name: 'DUMMY',
            age: 0
        })
    }
}
