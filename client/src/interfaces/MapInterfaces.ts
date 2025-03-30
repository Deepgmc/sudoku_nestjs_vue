import type DigAction from "@/umbrella/actions/Dig"
import type FightAction from "@/umbrella/actions/Fight"
import type MoveAction from "@/umbrella/actions/Move"
import type RobAction from "@/umbrella/actions/Rob"
import type TalkAction from "@/umbrella/actions/Talk"
import CellEntity from "@/umbrella/zoneEntities/CellObjects/CellEntity"
import type { rawItem } from "./ItemsInterfaces"
export interface IArea {
    areaName: string,
    districts: IDistrict[][],
    [key: string]: any
}
export interface IDistrict {
    districtName: string,
    districtPosition: TDistrictPosition,
    zones: IZone[][]
}
export interface IZone {
    zoneName: string,
    zonePosition: IZonePosition,
    zoneCells: ICell[][]
}
export interface IZoneHydrated extends Omit<IZone, 'zoneCells'> {
    zoneCells: THydratedZoneCells
}
export type THydratedZoneCells = CellEntity[][]

export type TDistrictPosition = {
    x: number,
    y: number
}
export type IZonePosition = {
    x: number,
    y: number
}
/**
ZONE CELLS (FROM MAP)
*/
export interface ICell {
    obj: ICellObject,
    features: TCellRawFeatures,
}

export interface ICellObject {
    name: string,
    [key: string]: any
}
/* RAW map features: */
export type TCellRawFeatures = IRawFeature[]
export interface IRawFeature {
    name: string,
    actions: TRawActions,
    items: rawItem[]
}
export interface IFeature {
    [key: string]: any
}

export type TRawActions = TRawAction[]
export type TRawAction = string

export interface TClickedCell {
    cell?: CellEntity,
    x?: number,
    y?: number
}

export type TAction = string
export type IAction = RobAction | DigAction | TalkAction | MoveAction | FightAction
