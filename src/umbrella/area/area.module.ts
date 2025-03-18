import { Module } from '@nestjs/common';

import { AreaController } from './area.controller';
import { AreaService } from './area.service';

@Module({
    controllers: [AreaController],
    providers: [
        { provide: AreaService, useClass: AreaService },
    ],
    imports: [
    ],
    exports: [
        AreaService
    ],
})
export class AreaModule { }
