import { NetworkManager } from "@/network/NetworkManager"
import type { AuthManager } from "@/auth/AuthManager"
import {type IArea, type IDistrict, type IZone} from '@/interfaces/MapInterfaces'

import { RESPONSE_STATUS_CODES } from '@/constants';

import UmbrellaManager from '@/umbrella/UmbrellaManager'
import PlayerManager from './PlayerManager'
import type { IPlayerGameSettings } from "@/interfaces/playerInterfaces"

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

    getDistrictByCoordinates(y: number, x: number): IDistrict{
        return this.store.area.districts[y][x]// 1-3
    }

    /**
     * Searches the area districts for player
       Got the coordinates from the player game_settings currentDistrict
     * @returns district IDistrict
     */
    getPlayerCurrentDistrict(): IDistrict {
        const playerDistrict = this.getDistrictFromSettings(this.player.getSettings())
        return playerDistrict
    }

    /**
     * Searches the district where player currentl locates
     * @param playerSettings currentDistrict currentZone options in player DB game_settings
     * @returns district where player current locates (IDistrict)
     */
    getDistrictFromSettings(playerSettings: IPlayerGameSettings): IDistrict{
        const ps = this.getXYFromFileName(playerSettings.currentDistrict)
        const districtX: number = parseInt(ps.x) // 3
        const districtY: number = parseInt(ps.y) // 1
        const district: IDistrict = this.getDistrictByCoordinates(districtY, districtX)
        return district
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
        const district = this.getDistrictByCoordinates(districtY, districtX)
        return district.zones[zoneX][zoneY]
    }

    /**
     * Searches the district zones for player
       Got the coordinates from the player game_settings CurrentZone
       Loads the zone settings file from server
     * @returns Zone settings with Cells: ICells
     */
    async getPlayerCurrentZone(playerDistrict: IDistrict): Promise<IZone>{
        const playerSettings = this.player.getSettings()
        const playerZone = this.getZoneFromSettings(playerDistrict, playerSettings)
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

    /**
     * Returns zone object from the loaded area
     * @param district district object
     * @param playerSettings
     * @returns zone object
     */
    getZoneFromSettings(district: IDistrict, playerSettings: IPlayerGameSettings): IZone {
        //currentDistrict: '3_1', currentZone: '2_1'
        const ps = this.getXYFromFileName(playerSettings.currentZone)
        const zoneX: number = parseInt(ps.x) // 2
        const zoneY: number = parseInt(ps.y) // 1
        const zone: IZone = this.getZoneByCoordinates(district.districtPosition.x, district.districtPosition.y, zoneX, zoneY)
        return zone
    }

    /**
     *
     * @param currentDistrict Splits the x and y from file-arguments
     * @returns object with coordinates
     */
    getXYFromFileName(currentDistrict: string){
        const sp = currentDistrict.split('_')
        return {
            x: sp[0],
            y: sp[1]
        }
    }
}