import type { IZone } from '@/interfaces/MapInterfaces'
import UmbrellaManager from '@/umbrella/UmbrellaManager'
import {CellEntityFactory} from '@/umbrella/zoneEntities/Factory'
import type { TObjectNames } from './zoneEntities/zoneEntities'
import type { IZoneHydrated, THydratedZoneCells } from '@/interfaces/MapInterfaces'
import type PlayerManager from '@/umbrella/PlayerManager';

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

    get zoneCells(): THydratedZoneCells{
        return this.store.zone.zoneCells
    }

    /**
     * @returns Fills the raw server-side map with real game objects
     */
    hydrateZoneObjects(): void {
        //replacing zoneCells with new one
        const {zoneCells, ...tmpZone} = this.zoneRaw
        const hydratedZone: IZoneHydrated = {...tmpZone, zoneCells: {} as THydratedZoneCells}
        hydratedZone.zoneCells = this.zoneRaw.zoneCells.map(row => {
            return row.map(cell => {
                return CellEntityFactory(cell.obj.name as TObjectNames, cell.obj.options)
            })
        })

        console.log('%c hydratedZone:', 'color:rgb(158, 2, 119);', hydratedZone)
        this.store.loadZoneToStore(hydratedZone)
    }

    setPlayerToMap(player: PlayerManager): void {
        this.zoneCells.forEach((row, indexY) => {
            return row.forEach((cell, indexX) => {
                cell.player = null //remove player everywhere
                if(player.isHere(indexX, indexY)){
                    cell.player = player
                }
            })
        })
    }
}