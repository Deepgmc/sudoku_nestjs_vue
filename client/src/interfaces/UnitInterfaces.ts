import type { Ref } from "vue"
import type { IRawEquiped, IRawItem, SLOT_TYPES } from "./ItemsInterfaces"
import type { TRawActions } from "./MapInterfaces"
import type Unit from "@/umbrella/zoneEntities/Units/Unit"

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
    level        : number,
    experience   : number,
    currentHealth: number,
    maxHealth    : number,
    strength     : number,
    agility      : number,
    intellect    : number,
}

/**FIGHT */

export interface IRound {
    unit1      : IFightUnit,
    unit2      : IFightUnit,
    isFinished : boolean,
}
export interface IFightUnit {
    unit: Unit,
    strikeTarget: Ref<SLOT_TYPES | undefined>,
    blockTarget: Ref<SLOT_TYPES | undefined>,
}

export type TStrikeResult = {
    isDead: boolean,
    deadUnit: IFightUnit | null
}

export interface IBodyPart {
    value: SLOT_TYPES,
    label: string,
    icon: string,
    color: string
}
export interface IFightMessage {
    text: string,
    who: string,
    color: string
}