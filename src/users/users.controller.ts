import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
middleware
guard
pipe
intercepter
*/

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){

    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        console.log('FindOne starts');
        try {
            const nId: number = Number(id)
            if(Number.isNaN(nId)) throw new Error(`Wrong user id get-paramter: ${id}`)
            const user = await this.usersService.findOne(Number(nId));
            return JSON.stringify(user)
        } catch(e){
            console.error('Error in parameter');
        }
    }

    @Post('set_user')
    create(@Body() userDto: CreateUserDto) {
        // смотри https://docs.nestjs.com/techniques/validation#stripping-properties
        // чтоб отсеивать ненужные пропсы
        console.log('Create user req:', userDto);
        return this.usersService.create(userDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
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
