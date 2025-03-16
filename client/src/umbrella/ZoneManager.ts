import type { IZone } from '@/interfaces/MapInterfaces'
import UmbrellaManager from '@/umbrella/UmbrellaManager'
import {CellEntityFactory} from '@/umbrella/zoneEntities/Factory'
import type { TObjectNames } from './zoneEntities/zoneEntities'
import type { IZoneHydrated, THydratedZoneCells } from '@/interfaces/MapInterfaces'

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
        const {zoneCells, ...tmpZone} = this.zoneRaw
        const hydratedZone: IZoneHydrated = {...tmpZone, zoneCells: {} as THydratedZoneCells}
        hydratedZone.zoneCells = this.zoneRaw.zoneCells.map(row => {
            return row.map(cell => {
                const hydratedObject = CellEntityFactory(cell.obj.name as TObjectNames, cell.obj.options)
                //console.log('%c hydratedObject:', 'color:rgb(182, 86, 158);', hydratedObject)
                return hydratedObject
            })
        })


        console.log('%c hydratedZone:', 'color:rgb(158, 2, 119);', hydratedZone)
        return hydratedZone
        //this.store.loadZoneToStore(zoneReorganized)
    }
}