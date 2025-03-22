export type TUserId = number

export type IPlayerRaw = {
    player: IPlayer,
    equiped: IEquiped,
    inventory: IInventory
}
export interface IPlayer {
    playerIcon: string,
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

export interface IEquiped {
    name: string,
    [key: string]: any
}
export interface IInventory {
    [key: string]: any
}