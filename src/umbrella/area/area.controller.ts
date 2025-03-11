import { Controller, Get, UseGuards } from '@nestjs/common';

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
}