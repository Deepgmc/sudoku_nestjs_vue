/**
MAP GLOBAL
*/
import CellEntity from "@/umbrella/zoneEntities/CellEntity"
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
    features: TCellFeatures,
}

export interface ICellObject {
    name: string,
    [key: string]: any
}
export type TCellFeatures = IFeature[]
export interface IFeature {
    name: string
}

export type TCellActions = (() => any) | string[]


export interface TClickedCell {
    cell?: CellEntity,
    x?: number,
    y?: number
  }