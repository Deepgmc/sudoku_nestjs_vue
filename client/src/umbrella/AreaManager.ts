import { NetworkManager } from "@/network/NetworkManager"
import type { AuthManager } from "@/auth/AuthManager"
import {type IArea, type IDistrict, type IZone} from '@/interfaces/MapInterfaces'

import { RESPONSE_STATUS_CODES } from '@/constants';

import UmbrellaManager from '@/umbrella/UmbrellaManager'
import PlayerManager from './PlayerManager'

/**
 * Main map class. Stores the whole map + actions and helpers
 */
export default class AreaManager extends UmbrellaManager {
    static instance: AreaManager
    static getInstance(){
        if(AreaManager.instance) return AreaManager.instance
        AreaManager.instance = new AreaManager()
        return AreaManager.instance
    }

    private constructor() {
        super()
        this._getData = this.networkManager.applyNetworkMethod('get', 'area')(this.authManager)
        this._postData = this.networkManager.applyNetworkMethod('post', 'area')(this.authManager)
        this.player = PlayerManager.getInstance()
    }

    private player: PlayerManager
    API_METHODS = {
        INIT_GET_AREA: 'get_area',
        INIT_GET_ZONE: 'get_zone_file',
    }
    private _getData: (action: string) => any
    private _postData: (action: string) => any


    async init(){
        const getAreaResult = await this._getData(this.API_METHODS.INIT_GET_AREA)(null)
        // this.area = getAreaResult.data as IArea
        //! @ts-expect-error -->> TAreaStore | TPlayerStore - type is ok
        this.store.loadAreaToStore(getAreaResult.data as IArea)
        return this
    }

    getDistrictByCoordinates(x: number, y: number): IDistrict{
        return this.store.area.districts[y][x]// 1-3
    }

    /**
     * Searches the area districts for player
       Got the coordinates from the player
     * @returns district IDistrict
     */
    getPlayerCurrentDistrict(): IDistrict {
        const playerDistrict: IDistrict = this.getDistrictByCoordinates(
            this.player.districtX as number,
            this.player.districtY as number
        )
        return playerDistrict
    }

    /**
     * Gets the zone from loaded area by the district and zone coordinates
     * @param districtX
     * @param districtY
     * @param zoneX
     * @param zoneY
     * @returns Zone object
     */
    getZoneByCoordinates(
        districtX: number,
        districtY: number,
        zoneX: number,
        zoneY: number
    ){
        const district = this.getDistrictByCoordinates(districtX, districtY)
        return district.zones[zoneY][zoneX]
    }

    /**
     * Searches the district zones for player
       Got the coordinates from the player game_settings CurrentZone
       Loads the zone settings file from server
     * @returns Zone settings with Cells: ICells
     */
    async getPlayerCurrentZone(playerDistrict: IDistrict): Promise<IZone>{
        const playerZone: IZone = this.getZoneByCoordinates(
            playerDistrict.districtPosition.x,
            playerDistrict.districtPosition.y,
            this.player.zoneX as number,
            this.player.zoneY as number
        )
        const zoneFileData = await this._getData(this.API_METHODS.INIT_GET_ZONE)({
            zone: playerZone.zonePosition,
            district: playerDistrict.districtPosition
        })
        if(zoneFileData.status === RESPONSE_STATUS_CODES.SUCCESS){
            return zoneFileData.data
        } else {
            throw new Error('Invalid zone loading')
        }
    }
}