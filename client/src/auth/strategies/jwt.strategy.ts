import {type jwtTokenType } from '@/interfaces/Auth'
import { Strategy } from './Strategy'
import { NetworkManager, type INetworkManager } from '@/network/NetworkManager.ts'
import type { ILoginUser } from '@/interfaces/user'
import { StorageManager } from '@/storage/storageManager'
import { RESPONSE_STATUS_CODES } from '@/constants'

const $networkManager: INetworkManager = NetworkManager.getInstance()

export class jwtStrategy extends Strategy {

    private _token: jwtTokenType = null

    private _apiSection: string = 'auth'
    private _postData: ((type: string) => any)

    private storageManager = new StorageManager(localStorage)

    constructor(){
        super()
        this._postData = $networkManager.applyNetworkMethod('post')(this._apiSection)
    }

    /**
     * Login via default JWT strategy
     * @param username User login
     * @param password
     * @returns Is user logined success or no
    */
    async login(loginData: ILoginUser): Promise<any>{
        const loginRes = await this._postData('login')(loginData)
        if(loginRes.status === RESPONSE_STATUS_CODES.CREATED){
            this.token = loginRes.data.access_token
            return this.storageManager.saveAuthData({access_token: this.token})
        }
        return false
    }

    isLogined(){
        const authData = this.storageManager.getAuthData()
        return !!authData && typeof authData.access_token !== 'undefined'
    }

    set token(token: jwtTokenType){
        this._token = token
    }
    get token(){
        return this._token
    }
}