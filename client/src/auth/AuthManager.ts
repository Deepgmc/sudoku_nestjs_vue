
import { type App as AppType } from 'vue'
import { availableStrategies, type IAuthManager } from '@/interfaces/Auth'
import { useAuthStore } from '@/stores/auth'
import { NetworkManager, type INetworkManager } from '@/network/NetworkManager.ts'

import type { ILoginUser, TRegisterForm } from '@/interfaces/user'
import type { TStrategies } from '@/interfaces/Auth'
import { jwtStrategy } from '@/auth/strategies/jwt.strategy'


const $networkManager: INetworkManager = NetworkManager.getInstance()

export class AuthManager implements IAuthManager{

    public availableStrategies = availableStrategies

    _strategy: TStrategies = null
    _authStore

    private _isLogined: boolean = false //авторизация, любыми стратегиями

    static instance: AuthManager | null = null
    static getInstance(
        strategy: IAuthManager['_strategy'],
        authStore: any
    ): IAuthManager {
        if(AuthManager.instance) {
            AuthManager.instance.updateIsLogined()
            return AuthManager.instance
        }
        return new AuthManager(strategy, authStore)
    }

    private _apiSection: string = 'auth'
    private _postData: ((type: string) => any)

    constructor(
        strategy: IAuthManager['_strategy'],
        authStore: any
    ){
        if(AuthManager.instance) throw new TypeError('Instance creation only with .getInstance()')
        this._strategy = strategy
        this._authStore = authStore
        this._postData = $networkManager.applyNetworkMethod('post')(this._apiSection)
        this.updateIsLogined()
        AuthManager.instance = this
    }

    async registerRequest(registerData: TRegisterForm): Promise<any>{
        if(this.isLogined) return {error: {message: 'You already logined'}}
        return await this._postData('register')(registerData)
    }

    /**
     * Depends on strategy: logins current user, saving authorisation data
       Do not use directly. Use loginRequest() instead
     * @returns saved login status or no
    */
    async loginRequest(loginData: ILoginUser): Promise<any> {
        if(this.isLogined) return {error: {message: 'You already logined'}}
        if(!this._strategy) return {error: {message: 'Invalid login strategy'}}

        this._isLogined = await this._strategy.login(loginData)
        if(this._isLogined) this._authStore.setIsLogined()
        else this._authStore.setIsNotLogined()

        const isLoginrequestSuccess = await this._strategy.login(loginData)

        this.updateIsLogined()

        return isLoginrequestSuccess
    }

    /**
    Checks whether the clien-side storage have an auth data
    */
    get isLogined(){
        console.log('AuthManager isLogined call:', this._isLogined)
        return this._isLogined
    }

    updateIsLogined(): boolean{
        if(!this._strategy) return false
        const strategyIslogined = this._strategy.isLogined()
        this._authStore.setIsLogined(strategyIslogined)
        this._isLogined = strategyIslogined

        return this._isLogined
    }

    set isLogined(someFailParameter){
        throw new ReferenceError('Cant set isLogined directly')
    }

}

export default {
    install: (app: AppType) => {
        console.info('Auth manager as plugin instance created')
        app.provide('$authManager', AuthManager.getInstance(new jwtStrategy(), useAuthStore()) )
    }
}