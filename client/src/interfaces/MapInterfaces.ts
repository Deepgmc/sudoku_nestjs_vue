import type CellEntity from "@/umbrella/zoneEntities/CellObjects/CellEntity"
import type { IRawItem } from "./ItemsInterfaces"
import type FeatureEntity from "@/umbrella/zoneEntities/FeatureObjects/FeatureEntity"
import type ZoneManager from "@/umbrella/ZoneManager"
import type PlayerManager from "@/umbrella/PlayerManager"
import type MapAction from "@/umbrella/actions/MapAction"

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
export interface IZoneHydrated {
    zoneName: string,
    zonePosition: IZonePosition,
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
export interface TObjectWithZonePosition extends IZonePosition {
    [key: string]: any
}

export type infoIconsObject = {
    icon: string,
    description: string
}
/**
ZONE CELLS (FROM MAP)
*/
export type TCoords = {x: number, y: number}
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
    items: IRawItem[]
}

/**ACTIONS */
export type TRawActions = TRawAction[]
export type TRawAction = string

export interface TClickedCell {
    cell: CellEntity,
    x: number,
    y: number
}

export type TAction = string

export type TActionPayload = {
    type       : string,
    clickedCell: TClickedCell,
    action     : MapAction,
    player     : PlayerManager

    feature?: FeatureEntity,
    zoneManager?: ZoneManager,

    [key: string]: any
}
export interface IActionResult {
    afterAction: (...params: any) => void
}

//CHAT
export interface IChatMessage {
    text: string
}
