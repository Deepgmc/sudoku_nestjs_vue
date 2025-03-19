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
    obj: ICellObj,
    features: string[],
}
export interface ICellObj {
    name: string,
    options: TCellObjOptions
}
export type TCellObjOptions = {
    orientation?: string,
    floor?: number,
    isEntrance?: boolean,
    actions: TCellActions
}
export type TCellFeatures = string[]

export type TCellActions = (() => any) | string[]