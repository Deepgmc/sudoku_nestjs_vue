import { NetworkManager } from "@/network/NetworkManager"
import type { AuthManager } from "@/auth/AuthManager"
import {type IArea} from '@/interfaces/MapInterfaces'

import { StoreDecorator } from "./StoreDecorator"

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
        console.log('%c AreaManager constructor starts', 'color:rgb(182, 86, 158);')
    }

    public area: IArea = {} as IArea
    API_METHODS = {
        INIT_GET_AREA: 'get_area'
    }


    async init(){
        const getAreaResult = await this.networkManager.applyNetworkMethod('get', 'area')(this.authManager)(this.API_METHODS.INIT_GET_AREA)(null)

        this.area = getAreaResult.data as IArea
        console.log('%c this.area (from server):', 'color:rgb(182, 86, 158);', this.area)
        // @ts-expect-error -->> TAreaStore | TPlayerStore - type is ok
        this.store.loadAreaToStore(this.area)
    }
}