import type { IZone, TCoords, TObjectWithZonePosition } from '@/interfaces/MapInterfaces'
import UmbrellaManager from '@/umbrella/UmbrellaManager'
import {CellEntityFactory} from '@/umbrella/zoneEntities/CellEntityFactory'
import type { IZoneHydrated, THydratedZoneCells } from '@/interfaces/MapInterfaces'
import PlayerManager from '@/umbrella/PlayerManager';
import { useZoneStore } from '@/stores/zoneStore'

export default class ZoneManager extends UmbrellaManager {
    static instance: ZoneManager
    static getInstance(zoneRaw?: IZone){
        if(ZoneManager.instance) return ZoneManager.instance
        ZoneManager.instance = new ZoneManager(zoneRaw)
        return ZoneManager.instance
    }

    store: ReturnType<typeof useZoneStore>;

    private constructor(zoneRaw?: IZone) {
        super()
        this.store = useZoneStore()
        if(zoneRaw) this.zoneRaw = zoneRaw //receiving the zone setting object from the server map
        else this.zoneRaw = {} as IZone
    }

    public player: PlayerManager = PlayerManager.getInstance()
    private zoneRaw: IZone

    get zoneCells(): THydratedZoneCells {
        return this.store.zone.zoneCells
    }

    /**
     * @returns Fills the raw server-side map with real game objects
     */
    hydrateZoneObjects(): void {
        //replacing zoneCells with new one
        const {zoneCells, ...tmpZone} = this.zoneRaw
        const hydratedZone: IZoneHydrated = {...tmpZone, zoneCells: {} as THydratedZoneCells}
        hydratedZone.zoneCells = this.zoneRaw.zoneCells.map((row, indexY) => {
            return row.map((cell, indexX) => {
                return CellEntityFactory(cell.obj, cell.features, {x: indexX, y: indexY})
            })
        })

        this.store.loadZoneToStore(hydratedZone)
    }

    async setAndMovePlayer(newCoords: TCoords): Promise<void> {
        if(typeof this.zoneCells[newCoords.y][newCoords.x] === 'undefined'){
            throw new Error(`Incorrent zoneCells indexes: ${newCoords.x}, ${newCoords.y}`)
        }
        const targetCell = this.zoneCells[newCoords.y][newCoords.x]
        if(!targetCell.isMovable()){
            throw new Error('Passability false. Cant move!')
        }
        await this.removePlayerFromMap()
            .then(res => {
                this.player.movePlayer(newCoords.x, newCoords.y, targetCell)
                targetCell.player = this.player
                this.setPlayerVisibility(this.player)
                console.log(`%c Player moving to: x${newCoords.x} y${newCoords.y}`, 'color:rgb(182, 86, 158);', this.player)
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

    /**
     * Player can see only the visibilityRange cells around himself
     * @param playerManager
     */
    setPlayerVisibility(player: PlayerManager): void {
        this.zoneCells.forEach((row, indexY) => {
            return row.forEach((cell, indexX) => {
                const xRange = Math.abs(player.x - indexX)
                const yRange = Math.abs(player.y - indexY)
                cell.isVisibleToplayer = !(xRange > player.visibilityRange || yRange > player.visibilityRange)
            })
        })
    }

    // дистанция между 2 объектами, у которых есть zone-координаты x y
    // по одной оси, возвращается максимальная
    getDistanceBetween(obj1: TObjectWithZonePosition, obj2: TObjectWithZonePosition): number{
        return Math.max(
            Math.abs(obj1.x - obj2.x),
            Math.abs(obj1.y - obj2.y),
        )
    }

}