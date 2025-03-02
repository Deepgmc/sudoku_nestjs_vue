import type { App as AppType } from 'vue'
import axios from 'axios'
import type { AxiosInstance, Axios, AxiosRequestConfig, AxiosResponse } from 'axios'

export class NetworkManager implements INetworkManager{

    static instance: NetworkManager | null = null
    static getInstance(): NetworkManager{
        if(NetworkManager.instance) return NetworkManager.instance
        return new NetworkManager()
    }
    private httpClient: HttpClientTypes

    constructor(){
        if(NetworkManager.instance) {throw new TypeError('Instance creation only with .getInstance()')}

        this.httpClient = axios.create({
            baseURL: 'http://localhost:5173',
            timeout: 1000,

        });
        NetworkManager.instance = this
    };

    /**
     *
     * @returns каррирован, чтобы мочь поэтапно наполнять запрос
     */
    applyNetworkMethod(type: string){
        return (section: string) => {
            return (action: string) => {
                //return async (parameters: any): Promise<AxiosResponse | {error: any}> => {
                return async (parameters: any): Promise<AxiosResponse | {error: any}> => {
                    // FIXME .post -> [type]
                    return await this.httpClient
                        ?.post(`${section}/${action}`, parameters)
                        .catch(function(e){
                            return {error: e}
                        })
                }
            }

        }
    }

}

export interface INetworkManager {
    applyNetworkMethod: (type: string) => (section: string) => (action: string) => (parameters: any) => Promise<AxiosResponse | {error: any}>
}
export type HttpClientTypes = Axios




//plugin
export default {
    install: (app: AppType) => {
        //console.log('Network manager as plugin instance created')
        //app.config.globalProperties.$networkManager = NetworkManager.getInstance()
        //app.provide('$networkManager', NetworkManager.getInstance())
    }
}