import type { IZone } from '@/interfaces/MapInterfaces'
import UmbrellaManager from '@/umbrella/UmbrellaManager'
import {CellEntityFactory} from '@/umbrella/zoneEntities/Factory'
import type { TObjectNames } from './zoneEntities/zoneEntities'

export default class ZoneManager extends UmbrellaManager {
    static instance: ZoneManager
    static getInstance(zoneRaw: IZone){
        if(ZoneManager.instance) return ZoneManager.instance
        ZoneManager.instance = new ZoneManager(zoneRaw)
        return ZoneManager.instance
    }
    private constructor(zoneRaw: IZone) {
        super()
        this.zoneRaw = zoneRaw //receiving the zone setting object from the server map
    }

    private zoneRaw: IZone

    /**
     *
     */
    hydrateZoneObjects(){

        console.log('%c this.zoneRaw:', 'color:rgb(182, 86, 158);', this.zoneRaw.zoneCells)
        const thisCellsRow = this.zoneRaw.zoneCells.map(row => {
            const thisCells = row.map(cell => {
                const hydratedObject = CellEntityFactory(cell.obj.name as TObjectNames, cell.obj.options)
                console.log('%c hydratedObject:', 'color:rgb(182, 86, 158);', hydratedObject)
            })
        })

        //this.store.loadZoneToStore(zoneReorganized)
    }
}