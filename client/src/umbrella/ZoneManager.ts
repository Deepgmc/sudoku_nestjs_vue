import type { IZoneRaw, TCoords, TObjectWithZonePosition } from '@/interfaces/MapInterfaces'
import UmbrellaManager from '@/umbrella/UmbrellaManager'
import {CellEntityFactory} from '@/umbrella/zoneEntities/CellEntityFactory'
import type { IZoneHydrated } from '@/interfaces/MapInterfaces'
import PlayerManager from '@/umbrella/PlayerManager';
import { useZoneStore } from '@/stores/zoneStore'
import type CellEntity from './zoneEntities/CellObjects/CellEntity';

export default class ZoneManager extends UmbrellaManager {
    static instance: ZoneManager
    static getInstance(zoneRaw?: IZoneRaw){
        if(ZoneManager.instance) return ZoneManager.instance
        ZoneManager.instance = new ZoneManager(zoneRaw)
        return ZoneManager.instance
    }

    public store: ReturnType<typeof useZoneStore>;

    private constructor(zoneRaw?: IZoneRaw) {
        super()
        this.store = useZoneStore()
        if(zoneRaw) this.zoneRaw = zoneRaw //receiving the zone setting object from the server map
        else this.zoneRaw = {} as IZoneRaw
    }

    public player: PlayerManager = PlayerManager.getInstance()
    private zoneRaw: IZoneRaw

    getZoneCells() {
        return this.store.getZoneCells()
    }

    /**
     * @returns Fills the raw server-side map with real game objects
     */
    hydrateZoneObjects(): void {
        //replacing zoneCells with new one
        const {zoneCells, ...tmpZone} = this.zoneRaw
        const hydratedZone: IZoneHydrated = {...tmpZone, zoneCells: []}

        hydratedZone.zoneCells = this.zoneRaw.zoneCells.map((row, indexY): CellEntity[] => {
            return row.map((cell, indexX): CellEntity => {
                return CellEntityFactory(cell.obj, cell.features, cell.units, {x: indexX, y: indexY})
            })
        })

        hydratedZone.level = this.zoneRaw.level
        hydratedZone.zoneName = this.zoneRaw.zoneName

        this.store.loadZoneToStore(hydratedZone)
    }

    async setAndMovePlayer(newCoords: TCoords): Promise<void> {
        if(typeof this.getZoneCells()[newCoords.y][newCoords.x] === 'undefined'){
            throw new Error(`Incorrent zoneCells indexes: ${newCoords.x}, ${newCoords.y}`)
        }
        const targetCell = this.getZoneCells()[newCoords.y][newCoords.x]
        if(!targetCell.isMovable()){
            throw new Error('Passability false. Cant move!')
        }
        await this.removePlayerFromMap()
            .then(_res => {
                this.player.movePlayer(newCoords.x, newCoords.y)
                targetCell.player = true
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
            this.getZoneCells().forEach((row, _indexY) => {
                return row.forEach((cell, _indexX) => {
                    cell.player = false //remove player everywhere
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
        this.getZoneCells().forEach((row, indexY) => {
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