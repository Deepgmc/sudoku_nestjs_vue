import { NetworkManager } from "@/network/NetworkManager"
import type { AuthManager } from "@/auth/AuthManager"
import {type IArea, type IDistrict} from '@/interfaces/MapInterfaces'

import { StoreDecorator } from "./StoreDecorator"
import Player from "./Player"
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
        this.player = Player.getInstance(this.networkManager, this.authManager)
        //console.log('%c AreaManager constructor starts', 'color:rgb(182, 86, 158);')
    }

    public area: IArea = {} as IArea
    private player: Player
    API_METHODS = {
        INIT_GET_AREA: 'get_area'
    }

    async init(){
        const getAreaResult = await this.networkManager.applyNetworkMethod('get', 'area')(this.authManager)(this.API_METHODS.INIT_GET_AREA)(null)
        this.area = getAreaResult.data as IArea
        //console.log('%c AreaManager -> this.area (fetch):', 'color:rgb(182, 101, 86);', this.area)
        //! @ts-expect-error -->> TAreaStore | TPlayerStore - type is ok
        this.store.loadAreaToStore(this.area)
        return this
    }

    /**
     * Searches the area districts for player
       Got the coordinates from the player game_settings currentDistrict and CurrentZone
     * @returns district IDistrict
     */
    getPlayerDistrict(): IDistrict {
        const playerSettings = this.player.getSettings()
        const playerDistrict = this.getDistrictFromSettings(playerSettings)
        return playerDistrict
    }

    /**
     * Searches the district where player currentl locates
     * @param playerSettings currentDistrict currentZone options in player DB game_settings
     * @returns district where player current locates (IDistrict)
     */
    getDistrictFromSettings(playerSettings: IPlayerGameSettings): IDistrict{
        const ps = playerSettings.currentDistrict.split('_') //3_1
        const districtX: number = parseInt(ps[0]) // 3
        const districtY: number = parseInt(ps[1]) // 1
        const district: IDistrict = this.area.districts[districtY][districtX]
        return district
    }
}