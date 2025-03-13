import { Module } from '@nestjs/common';

import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { UsersModule } from '../../users/users.module';

@Module({
    controllers: [PlayerController],
    providers: [
        { provide: PlayerService, useClass: PlayerService },
    ],
    imports: [
        UsersModule
    ],
    exports: [
        PlayerService
    ],
})
export class PlayerModule { }
