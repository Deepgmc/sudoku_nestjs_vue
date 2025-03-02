
import { inject, type App as AppType } from 'vue'
import { availableStrategies, type IAuthManager, type jwtTokenType } from '@/interfaces/auth'
import { NetworkManager, type INetworkManager } from '@/network/NetworkManager.ts'

import type { TRegisterForm } from '@/interfaces/user'

//const $networkManager: INetworkManager = inject('$networkManager') as INetworkManager
const $networkManager: INetworkManager = NetworkManager.getInstance()

class AuthManager implements IAuthManager{

    public availableStrategies = availableStrategies
    strategy: IAuthManager['strategy'] = ''
    private _jwtToken: jwtTokenType = ''

    private _isLogined: boolean = false //авторизация, любыми стратегиями

    static instance: AuthManager | null = null
    static getInstance(): IAuthManager{
        if(AuthManager.instance) {
            return AuthManager.instance
        }
        return new AuthManager()
    }

    private _apiSection: string = 'auth'
    private _postData: ((type: string) => any)

    constructor(){
        if(AuthManager.instance) throw new TypeError('Instance creation only with .getInstance()')
        this._postData = $networkManager.applyNetworkMethod('post')(this._apiSection)
        AuthManager.instance = this
    }

    logIn(username: string, password: string): boolean {
        //todo make strategy as objects! and make this factory. LJS intensive2 5:56:42
        switch(this.strategy){
            case 'jwt':
                return this.logInDefault(username, password)
            break;
            default:
                throw new TypeError('Invalid login strategy')
        }
        return false
    }

    async register(registerData: TRegisterForm){
        if(this.isLogined) throw new Error('You already logined')

        return await this._postData('register')(registerData)

        /**
        запросить нетворк менеджер метод сохранения данных (post) в конструкторе
        вызвать этот метод, указав тип операции и передав данные
        */

        //return false
    }

    /**
     * Login via default JWT strategy
     * @param username User login
     * @param password
     * @returns Is user logined success or no
     */
    logInDefault(username: string, password: string): boolean {
        if(this.isLogined) {
            console.warn('Auth manager: Already logined')
            return true
        }
        this.strategy = 'jwt'
        console.log(username, password)
        return false
    }

    logOut(): void{
        this.jwtToken = null
    }

    get isLogined(){
        return this._isLogined
    }

    set isLogined(someFailParameter){
        throw new ReferenceError('Cant set isLogined directly')
    }

    set jwtToken(newToken){
        this._jwtToken = newToken
    }

    get jwtToken(){
        return this._jwtToken
    }


}

export default {
    install: (app: AppType) => {
        console.info('Auth manager as plugin instance created')
        app.provide('$authManager', AuthManager.getInstance())
    }
}