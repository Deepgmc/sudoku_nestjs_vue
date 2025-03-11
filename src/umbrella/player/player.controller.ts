import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport'
import { PlayerService } from './player.service'

@UseGuards(AuthGuard('jwt'))
@Controller('player')
export class PlayerController {
    constructor(
        private readonly playerService: PlayerService
    ){}

    @Get('get_full')
    getFullPlayer(){
        return true//await this.playerService.getFullPlayerData()
    }
}