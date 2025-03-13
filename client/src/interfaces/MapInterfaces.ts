/**
MAP GLOBAL
*/
export interface IArea {
    areaName: string,
    districts: IDistrict[][],
    [key: string]: any
}
export interface IDistrict{
    districtName: string,
    districtPosition: TDistrictPosition,
    zones: IZone[]
}
export interface IZone {
    zoneName: string,
    zonePosition: IZonePosition,
    zoneCells: ICell[]
}
export type TDistrictPosition = {
    x: number,
    y: number
}
export type IZonePosition = {
    x: number,
    y: number
}
/**
ZONE CELLS
*/
export interface ICell {
    obj: ICellObj,
    features: string[]
}
export interface ICellObj {
    className: string,
    options: TCellObjOptions
}
export type TCellObjOptions = {
    direction?: string
}