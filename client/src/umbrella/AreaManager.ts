import { NetworkManager } from "@/network/NetworkManager"
import type { AuthManager } from "@/auth/AuthManager"
import {type IArea, type IDistrict, type IZone} from '@/interfaces/MapInterfaces'

import { StoreDecorator } from "./StoreDecorator"
import Player from './Player'
import type { IPlayerGameSettings, TPlayerGameSettingsString } from "@/interfaces/playerInterfaces"

/**
 * Main map class. Stores the whole map + actions and helpers
 */
export default class AreaManager extends StoreDecorator {
    static instance: AreaManager
    static getInstance(
        networkManager: NetworkManager,
        authManager: AuthManager
    ){
        if(AreaManager.instance) return AreaManager.instance
        AreaManager.instance = new AreaManager(networkManager, authManager)
        return AreaManager.instance
    }

    constructor(
        private networkManager: NetworkManager,
        private authManager: AuthManager
    ) {
        super()
        this._getData = this.networkManager.applyNetworkMethod('get', 'area')(this.authManager)
        this._postData = this.networkManager.applyNetworkMethod('post', 'area')(this.authManager)
        this.player = Player.getInstance(this.networkManager, this.authManager)
        //console.log('%c AreaManager constructor starts', 'color:rgb(182, 86, 158);')
    }

    private player: Player
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

    /**
     * Searches the area districts for player
       Got the coordinates from the player game_settings currentDistrict
     * @returns district IDistrict
     */
    getPlayerCurrentDistrict(): IDistrict {
        const playerSettings = this.player.getSettings()
        const playerDistrict = this.getDistrictFromSettings(playerSettings)
        // console.log('%c playerSettings:', 'color:rgb(182, 86, 158);', playerSettings)
        // console.log('%c playerDistrict:', 'color:rgb(182, 86, 158);', playerDistrict)
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
        console.log('%c districtX, districtY', 'color:rgb(182, 86, 158);', districtX, districtY)
        const district: IDistrict = this.store.area.districts[districtY][districtX]
        return district
    }

    /**
     * Searches the district zones for player
       Got the coordinates from the player game_settings CurrentZone
     * @returns district IZone
     */
    async getPlayerCurrentZone(playerDistrict: IDistrict): Promise<IZone>{
        const playerSettings = this.player.getSettings()
        const playerZone = this.getZoneFromSettings(playerDistrict, playerSettings)
        console.log('%c playerSettings:', 'color:rgb(182, 86, 158);', playerSettings)
        //console.log('%c playerZone:', 'color:rgb(182, 86, 158);', playerZone)
        const zoneFileData = await this._getData(this.API_METHODS.INIT_GET_ZONE)( {
            zone: playerZone.zonePosition,
            district: playerDistrict.districtPosition
        } )
        console.log('%c zoneFileData:', 'color:rgb(182, 86, 158);', zoneFileData)
        return playerZone
    }

    getZoneFromSettings(district: IDistrict, playerSettings: IPlayerGameSettings): IZone{
        //currentDistrict: '3_1', currentZone: '2_1'
        const ps = this.getXYFromFileName(playerSettings.currentZone)
        const zoneX: number = parseInt(ps.x) // 2
        const zoneY: number = parseInt(ps.y) // 1
        console.log('%c zoneX, zoneY', 'color:rgb(182, 86, 158);', zoneX, zoneY)
        // console.log('%c district.zones:', 'color:rgb(182, 86, 158);', district.zones)

        const zone: IZone = district.zones[zoneX][zoneY]
        return zone
    }

    getXYFromFileName(currentDistrict: string){
        const sp = currentDistrict.split('_')
        return {
            x: sp[0],
            y: sp[1]
        }
    }
}