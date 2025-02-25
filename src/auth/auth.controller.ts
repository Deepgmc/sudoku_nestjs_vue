import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

//! эти наследники гварды можно использовать чтоб дописывать свою логику в дефолтные паспорт гварды
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

import { AuthGuard } from '@nestjs/passport'


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() req) {
        /**
        Адрес login - принимает в посте логин и пароль, юзает гвард LocalAuthGuard
        (который наследован от пасспорт-гварда AuthGuard('local'), который тягает local-auth.guard.ts)
        Он в свою очередь ищет юзера, проверяет логин пароль и возвращает в паспорт юзера
        А тот уже в конце запихивает этот объект юзера в реквест и делает еще всякую магию, наверное
        */
        console.log('Conctroller got user in request (after guard):', req.user);
        const jwtAnswer = this.authService.login(req.user)
        console.log(jwtAnswer);
        return jwtAnswer
    }

    // @UseGuards(LocalAuthGuard)
    // @Post('logout')
    // logout(@Request() req) {
    //     console.log('Logout controller')
    //     return req.logout();
    // }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    profile(@Request() req) {
        console.log('Profile controller', req);

        /**
        доступ по гет-запросу с хедером:
        Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDAyOTgwNzYsImV4cCI6MTc0MDMwMTY3Nn0.ROg6Ez4JmeiythFhNQk0fVrsWnzjMWQmBwOE6l-Kiz4
        */

        return '<body style="background-color:black;color:white;"><b>Profile page</b></body>'
    }

}
