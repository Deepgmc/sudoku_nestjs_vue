//import * as fsPromises from "node:fs/promises";
import { Injectable } from "@nestjs/common";
import { UsersService } from "../../users/users.service";
import { TUserId, IUser } from "../../interfaces/user.interface";
import type { IPlayer, IPlayerSettings } from "../../interfaces/player.interface";

@Injectable()
export class PlayerService {
    constructor(
        private readonly usersService: UsersService
    ) { }

    async getFullPlayerData(user: IUser): Promise<IPlayer>{
        const gameSettings = await this.usersService.getGameSettings(user.userId)
        return {
            userId: user.userId,
            userName: user.username,
            game_settings: JSON.parse(gameSettings)
        }
    }
}