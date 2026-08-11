import {type jwtTokenType } from '@/interfaces/Auth'

import { Strategy } from './Strategy';
import type { ILoginUser } from '@/interfaces/user';
import { RESPONSE_STATUS_CODES } from '@/utils/constants';
import type { TAuthRenponse, TServerStatus } from '@/interfaces/Error.ts';
import NetworkManager, { EReqMethods } from '@/network/NetworkManager.ts';
import { isSuccessRequest } from '@/utils/helpers/network';

//const $networkManager = NetworkManager.getInstance()

export class jwtStrategy extends Strategy {

    private _apiModule: string = 'auth'
    private _postData: (action: string) => any
    private _getData: (action: string) => any

    constructor(
        private networkManager: NetworkManager
    ){
        super()
        this._postData = this.networkManager.getApiRequestMethod(EReqMethods.post)(this._apiModule)
        this._getData = this.networkManager.getApiRequestMethod(EReqMethods.get)(this._apiModule)
    }

    /**
     * Login via default JWT strategy
     * @param username User login
     * @param password
     * @returns Is user logined success or no
    */
    async login(loginData: ILoginUser): Promise<TAuthRenponse> {
        const loginRes = await this._postData('login')(loginData, false)
        console.log('loginRes:', loginRes)
        this.setAuthStoragedData({
            access_token: loginRes.data.access_token,
            userId: loginRes.data.user.userId
        })
        await this.isLogined()
        return { error: false, message: 'Успешная авторизация', data: loginRes.data }
    }

    logOut(): boolean{
        return this.removeAuthStoragedData()
    }

    /**
     * Is strategy has an authorisation
     * @returns boolean
     */
    async isLogined(): Promise<TServerStatus> {
        let isLogined: TServerStatus = {isLogined: false}
        isLogined = await this.checkServerStrategyStatus()
        return isLogined
    }

    /**
     * Checks the server token
     * @returns whether token valid or not
     */
    async checkServerStrategyStatus(): Promise<TServerStatus> {
        let isLogined = false
        try {
            const res = await this._getData('check_token')()
            if(isSuccessRequest(res)) {
                isLogined = true
            } else if (res.error && res.error.status === RESPONSE_STATUS_CODES.UNAUTHORIZED) {
                isLogined = false
            }
            return { isLogined: isLogined, userId: res.userId }
        } catch {
            return { isLogined: false }
        }
    }

    set token(token: jwtTokenType){
        throw new ReferenceError('Can not set token directly')
    }

    static get token(): jwtTokenType{
        const authData = jwtStrategy.getAuthStoragedData()
        if (!authData) return ''
        if (typeof authData.access_token !== 'undefined') {
            return authData.access_token
        }
        return ''
    }

    static get userId(): number {
        const authData = jwtStrategy.getAuthStoragedData()
        if (authData && !authData.access_token) return 0
        if (authData && typeof authData.userId !== 'undefined') {
            return authData.userId
        }
        return 0
    }

    isHasToken() {
        return !!jwtStrategy.token
    }
}