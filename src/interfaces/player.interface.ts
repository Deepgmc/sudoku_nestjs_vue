import { IRawItem } from "./ItemsInterfaces"
import { TUserId } from "./user.interface"

export type TEntityPlayerSettings = string

export interface IPlayer {
    userId: TUserId,
    userName: string,
    game_settings: IPlayerSettings
}

export interface IPlayerSettings {
    currentDistrict: string,
    currentZone: string
}

//EQUIPED
export interface IEquiped {
    head: IRawItem,
    body: IRawItem,
    legs: IRawItem,
    rhand: IRawItem,
    lhand: IRawItem,
}