
import { type App as AppType } from 'vue'
import { availableStrategies, type IAuthManager, type jwtTokenType } from '@/interfaces/auth'
import { NetworkManager, type INetworkManager } from '@/network/NetworkManager.ts'

import type { ILoginUser, TRegisterForm } from '@/interfaces/user'
import { RESPONSE_STATUS_CODES } from '@/constants'


//const $networkManager: INetworkManager = inject('$networkManager') as INetworkManager
const $networkManager: INetworkManager = NetworkManager.getInstance()

class AuthManager implements IAuthManager{

    public availableStrategies = availableStrategies
    _strategy: IAuthManager['_strategy'] = ''
    private _jwtToken: jwtTokenType = ''

    private _isLogined: boolean = false //авторизация, любыми стратегиями

    static instance: AuthManager | null = null
    static getInstance(): IAuthManager {
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

    async registerRequest(registerData: TRegisterForm): Promise<any>{
        if(this.isLogined) return {error: {message: 'You already logined'}}
        return await this._postData('register')(registerData)
    }

    async loginRequest(loginData: ILoginUser): Promise<any> {
        if(this.isLogined) return {error: {message: 'You already logined'}}
        switch(this._strategy){
            case 'jwt':
                return await this.loginJwt(loginData)
            break;
            default:
                throw new TypeError('Invalid login strategy')
        }
    }

    /**
     * Login via default JWT strategy
     * @param username User login
     * @param password
     * @returns Is user logined success or no
     */
    async loginJwt(loginData: ILoginUser): Promise<boolean> {
        const loginRes = await this._postData('login')(loginData)
        if(loginRes.status === RESPONSE_STATUS_CODES.CREATED){
            this.jwtToken = loginRes.access_token
            this._login()
        }
        return loginRes
    }

    _login() {
        return false
    }

    logOut(): void{
        this.jwtToken = null
    }

    setStrategy(s: IAuthManager['_strategy']){
        this._strategy = s
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