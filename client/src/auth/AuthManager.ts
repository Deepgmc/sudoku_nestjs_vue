
import { inject } from 'vue'
import { availableStrategies, type IAuthManager } from '@/interfaces/Auth'

import type { ILoginUser, TRegisterForm } from '@/interfaces/user'
import type { TStrategies } from '@/interfaces/Auth'
import { RESPONSE_STATUS_CODES } from '@/constants'
import { NetworkManager } from '@/network/NetworkManager.ts'



export class AuthManager implements IAuthManager {

    public availableStrategies = availableStrategies

    _strategy: TStrategies = null
    _authStore//pinia store

    private _isLogined: boolean = false //авторизация, любыми стратегиями
    networkManager: NetworkManager

    static instance: AuthManager | null = null
    static getInstance(
        strategy?: IAuthManager['_strategy'],
        authStore?: any
    ): AuthManager {
        if(AuthManager.instance) {
            return AuthManager.instance
        }
        return new AuthManager(strategy, authStore)
    }

    private _apiSection: string = 'auth'
    private _postData: (authManager: AuthManager) => any

    constructor(
        strategy?: IAuthManager['_strategy'],
        authStore?: any
    ){
        if(AuthManager.instance) throw new TypeError('Instance creation only with .getInstance()')
        AuthManager.instance = this
        if(strategy) this._strategy = strategy
        this._authStore = authStore
        this.networkManager = NetworkManager.getInstance()
        this._postData = this.networkManager.applyNetworkMethod('post', this._apiSection)

        this.updateAndGetIsLogined()
    }

    async registerRequest(registerData: TRegisterForm): Promise<any>{
        if(this.isLogined) return {error: {message: 'You already logined'}}
        return await this._postData(this)('register')(registerData)
    }

    /**
     * Depends on strategy: logins current user, saving authorisation data
       Do not use directly. Use loginRequest() instead
     * @returns saved login status or no
    */
    async loginRequest(loginData: ILoginUser): Promise<any> {
        if(this.isLogined) return {error: {message: 'You already logined'}}
        if(!this._strategy) return {error: {message: 'Invalid login strategy'}}

        const loginRes = await this._strategy.login(loginData)

        this._isLogined = loginRes
        this._authStore.setIsLogined(this._isLogined)

        return loginRes
    }

    /**
    Short method, do NOT update status and do NOT requesting a server
    Checks whether the clien-side has logined status
    */
    get isLogined(){
        return this._isLogined
    }
    set isLogined(someFailParameter){
        throw new ReferenceError('Cant set isLogined directly')
    }

    async updateAndGetIsLogined(): Promise<boolean> {
        console.log('AuthManager updateAndGetIsLogined() call:')
        if(!this._strategy) return false
        let isLogined = false

        isLogined = await this._strategy.isLogined()
        this._isLogined = isLogined
        this._authStore.setIsLogined(this._isLogined)
        if(!this._isLogined) this.logOut()
        return this._isLogined
    }

    logOut(): boolean {
        if(!this._strategy || !this.isLogined) return true
        this._strategy.logOut()
        this._authStore.setIsLogined(false)
        this._isLogined = false
        return true
    }
}

// export default {
//     install: (app: AppType) => {
//         console.info('Auth manager as plugin instance created')
//         const am = AuthManager.getInstance( new jwtStrategy(), useAuthStore())
//         app.config.globalProperties.$authManager = am
//         app.provide('$authManager', am )
//     }
// }