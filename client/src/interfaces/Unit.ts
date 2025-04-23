import type { IRawEquiped, IRawItem, SLOT_TYPES } from "./ItemsInterfaces"
import type { TRawActions } from "./MapInterfaces"

export type TCellRawFeatures = IRawFeature[]
export type TCellRawUnits = IUnitRaw[]
export interface IRawFeature {
    name: string,
    actions: TRawActions,
    items: IRawItem[]
}
export interface IUnitRaw {
    name: string,
    actions: TRawActions,
    items: IRawItem[],
    equiped: IRawEquiped,
}

export type TUnitStats = {
    level: number,
    experience: number,
    currentHealth: number,
    maxHealth: number,
    strength: number,
    agility: number,
    intellect: number,
}

/**FIGHT */
export interface IRound {
    u1StrikeTarget: SLOT_TYPES | undefined,
    u2StrikeTarget: SLOT_TYPES | undefined,
    isFinished: boolean
}