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

    @Get('get_player_data')
    async getFullPlayer(@Request() req){
        return await this.playerService.getFullPlayerData(req.user)
    }
}