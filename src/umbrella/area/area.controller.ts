import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport'
import { AreaService } from './area.service'

@UseGuards(AuthGuard('jwt'))
@Controller('area')
export class AreaController {
    constructor(
        private readonly areaService: AreaService
    ){}

    @Get('get_area')
    async getArea(){
        return await this.areaService.getInitArea('piter')
    }

    @Get('get_zone_file')
    getZone(
        @Query('district') districtCoords: any,
        @Query('zone') zoneCoords: any
    ){
        try{
            return this.areaService.getZoneFile(districtCoords, zoneCoords)
        } catch(_e: any){
            throw new TypeError('Invalid parameters at get_zone_file')
        }
    }
}