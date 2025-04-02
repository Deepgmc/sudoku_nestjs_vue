//import * as fsPromises from "node:fs/promises";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class AreaService {
    constructor() { }

    async getInitArea(areaName: string) {
        try {
            const {map} = await import(`../../../maps/${areaName}.js`)
            return JSON.stringify(map)
        } catch (_e: any) {
            throw new NotFoundException()
        }
    }

    async getZoneFile(districtCoords: any, zoneCoords: any) {
        try {
            const {zone} = await import(`../../../maps/piter/d${districtCoords.x}_${districtCoords.y}z${zoneCoords.x}_${zoneCoords.y}.ce.js`)
            return JSON.stringify(zone)
        } catch (_e: any) {
            throw new NotFoundException()
        }
    }
}