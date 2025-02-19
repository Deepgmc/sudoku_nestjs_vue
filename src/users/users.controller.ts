import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserId } from './userId.decorator';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ){}

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get(':id')
    //async findOne(@Param('id') id: string) {
    async findOne(@UserId() id: number) {
        try {
            const user = await this.usersService.findOne(Number(id));
            return user
        } catch(e){
            console.log('FindOne err message: ',e);
        }
    }
}
