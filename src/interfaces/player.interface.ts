import { TUserId } from "./user.interface"

export type TEntityPlayerSettings = string

export interface IPlayer {
    userId: TUserId,
    game_settings: IPlayerSettings
}

export interface IPlayerSettings {
    currentDistrict: string,
    currentZone: string
}