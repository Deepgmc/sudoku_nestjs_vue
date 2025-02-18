import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserId } from './userId.decorator';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ){}

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    //async findOne(@Param('id') id: string) {
    async findOne(@UserId() id: number) {
        console.log('FindOne starts. Id:', id);
        try {
            const nId: number = Number(id)
            if(Number.isNaN(nId)) throw new Error(`Wrong user id get-paramter: ${id}`)
            const user = await this.usersService.findOne(Number(nId));
            return JSON.stringify(user)
        } catch(e){
            console.log('FindOne err message: ',e);
        }
    }

    @Post('set_user')
    create(@Body() userDto: CreateUserDto) {
        // смотри https://docs.nestjs.com/techniques/validation#stripping-properties
        // чтоб отсеивать ненужные пропсы
        console.log('Create user req:', userDto);
        return this.usersService.create(userDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
