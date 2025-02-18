import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TUserId, IUser } from './interfaces/user.interface';
import { EAppModes } from '../types';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}

    public TYPE: typeof EAppModes = EAppModes;

    printTypeObject(){
        console.log(this.TYPE);
    }

    findOne(id: TUserId): Promise<IUser> {
        return Promise.resolve({
            id  : id,
            name: 'Serg',
        })
    }

    create(userDto: CreateUserDto) {
        return 'create This action adds a new user';
    }

    findAll(): Promise<Users[]> {
        console.log('findAll method in progress');
        return this.usersRepository.find();
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `update This action updates a ${id} user`;
    }

    remove(id: number) {
        return `remove This action removes a ${id} user`;
    }
}
