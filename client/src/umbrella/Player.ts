import type { NetworkManager } from "@/network/NetworkManager";
import { StoreDecorator } from "./StoreDecorator";
import type { AuthManager } from "@/auth/AuthManager";
import { type IPlayer } from "@/interfaces/player";

export default class Player extends StoreDecorator {
    static instance: Player
    static getInstance(
        networkManager: NetworkManager,
        authManager: AuthManager
    ){
        if(Player.instance) return Player.instance
        Player.instance = new Player(networkManager, authManager)
        return Player.instance
    }

    constructor(
        private networkManager: NetworkManager,
        private authManager: AuthManager
    ) {
        super()
        console.log('%c Player constructor starts', 'color:rgb(182, 86, 158);')
    }
    private area: IPlayer = {} as IPlayer
    API_METHODS = {
        INIT_PLAYER: 'get_full'
    }

    async init(){

        //? ЗАГРУЗИТЬ ТУТ ДАННЫЕ ЮЗЕРА
        // const getPlayerResult = await this.networkManager.applyNetworkMethod('get', 'player')(this.authManager)(this.API_METHODS.INIT_PLAYER)(null)
        // this.area = getPlayerResult.data as IPlayer
        // console.log('%c AreaManager -> this.area (fetch):', 'color:rgb(182, 101, 86);', this.area)
        // // @ts-expect-error -->> TAreaStore | TPlayerStore - type is ok
        // this.store.loadAreaToStore(this.area)
    }
}