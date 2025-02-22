import { Controller, Get, Logger } from '@nestjs/common';

import { UsersService } from './users.service';
import { UserId } from './userId.decorator';
import { IUser } from '../interfaces/user.interface';

@Controller('users')
export class UsersController {

    private readonly logger = new Logger('COM SERVICE')

    constructor(
        private readonly usersService: UsersService,
    ){}

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@UserId() id: number): Promise<IUser> {
        const user = await this.usersService.findOne(id)
        this.logger.debug(user)
        return user
    }
}
