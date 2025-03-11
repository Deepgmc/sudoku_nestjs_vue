import { Module } from '@nestjs/common';

import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
    controllers: [PlayerController],
    providers: [
        { provide: PlayerService, useClass: PlayerService },
    ],
    imports: [
    ],
    exports: [
        PlayerService
    ],
})
export class PlayerModule { }
