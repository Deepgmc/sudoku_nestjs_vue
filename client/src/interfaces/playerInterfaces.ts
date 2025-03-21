export type TUserId = number

export type IPlayerRaw = {
    player: IPlayer,
    equiped: IEquiped,
    inventory: IInventory
}
export interface IPlayer {
    level: number,
    experience: number,

    health: number,
    strength: number,
    agility: number,
    intellect: number,

    districtX: string,
    districtY: string,
    zoneX: string,
    zoneY: string,
    x: string,
    y: string
}

export interface IEquiped {
    name: string,
    [key: string]: any
}
export interface IInventory {
    [key: string]: any
}