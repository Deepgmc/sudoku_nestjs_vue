import type CellEntity from "@/umbrella/zoneEntities/CellObjects/CellEntity"
import type { IInventory, IItem, IRawEquiped, IRawItem } from "./ItemsInterfaces"

export type TUserId = number

export type IPlayerRaw = {
    player: {
        level: number,
        experience: number,
        currentHealth: number,
        maxHealth: number,
        strength: number,
        agility: number,
        intellect: number,

        districtX: number,
        districtY: number,
        zoneX: number,
        zoneY: number,
        x: number,
        y: number,
    },
    equiped: IRawEquiped,
    inventory: IRawItem[]
}
export interface IPlayer {
    inventory: IInventory,

    playerIcon: string,
    visibilityRange: number,
    moveRange: number,

    districtX: number,
    districtY: number,
    zoneX: number,
    zoneY: number,
    x: number,
    y: number,

    canMoveToCell: (cell: CellEntity) => boolean,
    applyItemStats: (item: IItem, actionType: string) => boolean,
}