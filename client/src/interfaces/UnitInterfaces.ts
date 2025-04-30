import type { FightParticipants } from "@/constants"
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
    u1BlockTarget: SLOT_TYPES | undefined,
    u2StrikeTarget: SLOT_TYPES | undefined,
    u2BlockTarget: SLOT_TYPES | undefined,
    isFinished: boolean
}

export interface IBodyPart {
    value: string,
    label: string,
    icon: string,
    color: string
}
export interface IFightMessage {
    text: string,
    who: FightParticipants
}