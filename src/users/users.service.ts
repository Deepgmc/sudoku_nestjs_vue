import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TUserId, IUser } from './interfaces/user.interface';
import { EAppModes } from '../types';

@Injectable()
export class UsersService {

    public PROD_TYPE: string = EAppModes.PROD

    findOne(id: TUserId): Promise<IUser> {
        return Promise.resolve({
            id: id,
            name: 'Serg',
            age: 36
        })
    }

    create(userDto: CreateUserDto) {
        return 'create This action adds a new user';
    }

    findAll() {
        return `findAll This action returns all users`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `update This action updates a ${id} user`;
    }

    remove(id: number) {
        return `remove This action removes a ${id} user`;
    }
}
