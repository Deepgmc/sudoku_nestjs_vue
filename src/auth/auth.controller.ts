import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
//import { MyAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        /**
        Адрес login - принимает в посте логин и пароль, юзает гвард LocalAuthGuard
        (который наследован от пасспорт-гварда AuthGuard('local'), который тягает local-auth.guard.ts)
        Он в свою очередь ищет юзера, проверяет логин пароль и возвращает в паспорт юзера
        А тот уже в конце запихивает этот объект юзера в реквест и делает еще всякую магию, наверное
        */
        console.log('Conctroller got user in request:', req.user);
        return req.user
    }

    @UseGuards(LocalAuthGuard)
    @Post('logout')
    async logout(@Request() req) {
        console.log('Logout controller')
        return req.logout();
    }

    @Get('profile')
    async profile(@Request() req) {
        console.log('Profile controller. Req:', req.logout);
        return '<body style="background-color:black;color:white;"><b>Profile page</b></body>'
    }

}
