import type CellEntity from "@/umbrella/zoneEntities/CellObjects/CellEntity"
import type FeatureEntity from "@/umbrella/zoneEntities/FeatureObjects/FeatureEntity"
import type ZoneManager from "@/umbrella/ZoneManager"
import type PlayerManager from "@/umbrella/PlayerManager"
import type MapAction from "@/umbrella/actions/MapAction"
import type Unit from "@/umbrella/zoneEntities/Units/Unit"
import type { TCellRawFeatures, TCellRawUnits } from "./UnitInterfaces"

export interface IArea {
    areaName: string,
    districts: IDistrict[][],
    [key: string]: any
}
export interface IDistrict {
    districtName: string,
    districtPosition: TDistrictPosition,
    zones: IZoneRaw[][]
}

export interface IZoneRaw {
    zoneName: string,
    zonePosition: TCoords,
    level: number,
    baseCoordinates: TCoords,
    zoneCells: ICell[][]
}

export interface IZoneHydrated {
    zoneName: string,
    zonePosition: TCoords,
    level: number,
    baseCoordinates: TCoords,
    zoneCells: CellEntity[][]
}

export type TDistrictPosition = {
    x: number,
    y: number
}

export interface TObjectWithZonePosition extends TCoords {
    [key: string]: any
}

export type infoIconsObject = {
    icon: string,
    description: string
}
/**
ZONE CELLS (FROM MAP)
*/
export type TCoords = {
    x: number,
    y: number
}
export interface ICell {
    obj     : ICellObject,
    features: TCellRawFeatures,
    units   : TCellRawUnits,
}

export interface ICellObject {
    name: string,
    [key: string]: any
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
    unit?: Unit,
    zoneManager?: ZoneManager,

    [key: string]: any
}
export interface IActionResult {
    afterAction: (...params: any) => void
}

//CHAT
export interface IChatMessage {
    text: string,
    timestamp: number
}
export interface IChatMessageTransformed extends IChatMessage {
    timeString: string
}
