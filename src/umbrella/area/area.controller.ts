import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';

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

    @Post('get_zone_file')
    getZone(
        @Body() coords: any,
    ){
        try{
            return this.areaService.getZoneFile(coords.district, coords.zone)
        } catch(_e: any){
            throw new TypeError('Invalid parameters at get_zone_file')
        }
    }
}