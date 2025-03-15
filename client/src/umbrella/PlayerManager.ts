import type { NetworkManager } from "@/network/NetworkManager";
import UmbrellaManager from '@/umbrella/UmbrellaManager';
import type { AuthManager } from "@/auth/AuthManager";
import { type IPlayer } from '@/interfaces/playerInterfaces';

export default class PlayerManager extends UmbrellaManager {
    static instance: PlayerManager
    static getInstance(
        // networkManager: NetworkManager,
        // authManager: AuthManager
    ){
        if(PlayerManager.instance) return PlayerManager.instance
        //PlayerManager.instance = new PlayerManager(networkManager, authManager)
        PlayerManager.instance = new PlayerManager()
        return PlayerManager.instance
    }

    private constructor(
        // private networkManager: NetworkManager,
        // private authManager: AuthManager
    ) {
        super()
        this._getData = this.networkManager.applyNetworkMethod('get', this._apiSection)(this.authManager)
        //console.log('%c Player constructor starts', 'color:rgb(182, 86, 158);')
    }
    private _getData: (action: string) => any
    private _apiSection: string = 'player'
    private player: IPlayer = {} as IPlayer

    API_METHODS = {
        INIT_PLAYER: 'get_full'
    }

    async init(){
        const getPlayerResult = await this._getData(this.API_METHODS.INIT_PLAYER)(null)
        this.player = getPlayerResult.data as IPlayer
        //! @ts-expect-error -->> TPlayerStore | TPlayerStore - type is ok
        this.store.loadPlayerToStore(this.player)
        return this
    }

    getSettings(){
        return this.player.game_settings
    }
}