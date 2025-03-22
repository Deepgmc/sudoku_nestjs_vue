import type { IZone } from '@/interfaces/MapInterfaces'
import UmbrellaManager from '@/umbrella/UmbrellaManager'
import {CellEntityFactory} from '@/umbrella/zoneEntities/Factory'
import type { IZoneHydrated, THydratedZoneCells } from '@/interfaces/MapInterfaces'
import type PlayerManager from '@/umbrella/PlayerManager';

export default class ZoneManager extends UmbrellaManager {
    static instance: ZoneManager
    static getInstance(zoneRaw?: IZone){
        if(ZoneManager.instance) return ZoneManager.instance
        ZoneManager.instance = new ZoneManager(zoneRaw)
        return ZoneManager.instance
    }
    private constructor(zoneRaw?: IZone) {
        super()
        if(zoneRaw) this.zoneRaw = zoneRaw //receiving the zone setting object from the server map
        else this.zoneRaw = {} as IZone
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
                return CellEntityFactory(cell.obj, cell.features)
            })
        })

        console.log('%c hydratedZone:', 'color:rgb(158, 2, 119);', hydratedZone)
        this.store.loadZoneToStore(hydratedZone)
    }

    setAndMovePlayer(player: PlayerManager, newX: number, newY: number): void {
        if(typeof this.zoneCells[newY][newX] === 'undefined'){
            throw new Error(`Incorrent zoneCells indexes: ${newX}, ${newY}`)
        }
        const targetCell = this.zoneCells[newY][newX]
        if(!targetCell.isMovable()){
            throw new Error('Passability FALSE. MAKE ERROR HANDLING')
        }
        this.removePlayerFromMap()
            .then(res => {
                targetCell.player = player
                player.setXY(newX, newY)
                console.log(`%c Player moving to: x${newX} y${newY}`, 'color:rgb(182, 86, 158);', player)
            })
    }

    /**
     * Removes player object from all the cellEntities
     * @returns
     */
    removePlayerFromMap(): Promise<boolean>{
        return new Promise(resolve => {
            this.zoneCells.forEach((row, indexY) => {
                return row.forEach((cell, indexX) => {
                    cell.player = null //remove player everywhere
                })
            })
            resolve(true)
        })

    }
}