//import * as fsPromises from "node:fs/promises";
import { Injectable } from "@nestjs/common";
import { UsersService } from "../../users/users.service";
import { TUserId } from "../../interfaces/user.interface";
import type { IPlayer, IPlayerSettings } from "../../interfaces/player.interface";

@Injectable()
export class PlayerService {
    constructor(
        private readonly usersService: UsersService
    ) { }

    async getFullPlayerData(userId: TUserId): Promise<IPlayer>{
        const gameSettings = await this.usersService.getGameSettings(userId)
        return {
            userId: userId,
            game_settings: JSON.parse(gameSettings)
        }
    }
}