//import * as fsPromises from "node:fs/promises";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AreaService {
    constructor() { }

    async getInitArea(areaName: string) {
        const {map} = await import(`../../../maps/${areaName}.js`)
        return JSON.stringify(map)
    }
}