import { inject } from 'vue'
import axios from 'axios'
import type { /*AxiosInstance,*/ Axios, /*AxiosRequestConfig*/ AxiosResponse } from 'axios'
import {type jwtTokenType } from '@/interfaces/Auth'
import { type AuthManager} from '@/auth/AuthManager'

export interface INetworkManager {
    applyNetworkMethod: (type: string, section: string) => ($authManager: AuthManager) => (action: string) => (parameters: any) => Promise<AxiosResponse | {error: any}>
}
export type HttpClientTypes = Axios

export class NetworkManager implements INetworkManager {

    static instance: NetworkManager | null = null
    static getInstance(): NetworkManager {
        if(NetworkManager.instance) return NetworkManager.instance
        console.log('New NetworkInstance call')
        return new NetworkManager()
    }
    private httpClient: HttpClientTypes

    constructor(){
        if(NetworkManager.instance) {throw new TypeError('Instance creation only with .getInstance()')}

        this.httpClient = axios.create({
            baseURL: 'http://localhost:5173/api',
            //baseURL: 'http://localhost:3050/api',
            //headers: {'Authorization': 'Bearer XXXXX'},
            //this.httpClient.defaults.headers.common['Authorization'] = AUTH_TOKEN;
            timeout: 1000,

        });
        NetworkManager.instance = this
    };

    /**
     * @returns каррирован, чтобы мочь поэтапно наполнять запрос
     */
    applyNetworkMethod(type: string, section: string){

        return ($authManager: AuthManager) => {

            if($authManager._strategy && typeof $authManager._strategy !== 'undefined'){
                this.applyAuthorisation($authManager._strategy.token)
            }

            return (action: string) => {

                return async (parameters: object): Promise<AxiosResponse | {error: any}> => {

                    switch (type) {
                        case 'post':
                            return await this.postMethod(`${section}/${action}`, parameters)
                        break;
                        case 'get':
                        return await this.getMethod(`${section}/${action}`, parameters)
                        break;
                        default:
                            return await this.postMethod(`${section}/${action}`, parameters)
                    }
                }
            }
        }
    }

    async postMethod(addr: string, parameters: object){
        return await this.httpClient.post(addr, parameters)
            .catch(function(e){
                return {error: e}
            })
    }
    async getMethod(addr: string, parameters: object){
        return await this.httpClient.get(addr, parameters)
            .catch(function(e){
                return {error: e}
            })
    }

    applyAuthorisation(token: jwtTokenType){
        this.httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

}



//plugin
// export default {
//     install: (app: AppType) => {
//         console.log('Network manager as plugin instance created')
//         app.config.globalProperties.$networkManager = NetworkManager.getInstance()
//         app.provide('$networkManager', NetworkManager.getInstance())
//     }
// }