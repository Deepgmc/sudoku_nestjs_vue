import { Controller, Get, UseGuards, Request } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport'
import { PlayerService } from './player.service'
import { TUserId, IUser } from '../../interfaces/user.interface';

@UseGuards(AuthGuard('jwt'))
@Controller('player')
export class PlayerController {
    constructor(
        private readonly playerService: PlayerService
    ){}

    @Get('get_full')
    async getFullPlayer(@Request() req){
        //console.log('%c getFull in player controller:', 'color:rgb(182, 86, 158);', req.user)
        return await this.playerService.getFullPlayerData(req.user)
    }
}