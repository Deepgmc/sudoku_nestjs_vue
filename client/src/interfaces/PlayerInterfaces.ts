import type { IInventoryItem, IItem, IRawItem } from "./ItemsInterfaces"

export type TUserId = number

export type IPlayerRaw = {
    player: IPlayer,
    equiped: IRawEquiped,
    inventory: IRawItem[]
}
export interface IPlayer {
    playerIcon: string,
    visibilityRange: number,
    level: number,
    experience: number,

    health: number,
    strength: number,
    agility: number,
    intellect: number,

    districtX: number,
    districtY: number,
    zoneX: number,
    zoneY: number,
    x: number,
    y: number
}

//EQUIPED
export interface IEquiped {
    head: IItem | null,
    body: IItem | null,
    legs: IItem | null,
    rhand: IItem | null,
    lhand: IItem | null,
}
export interface IRawEquiped {
    head: IRawItem,
    body: IRawItem,
    legs: IRawItem,
    rhand: IRawItem,
    lhand: IRawItem,
}