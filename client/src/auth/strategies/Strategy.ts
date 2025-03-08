import type { ILoginUser } from '@/interfaces/user'
import { StorageManager } from '@/storage/storageManager'
import { type TAuthData } from '@/interfaces/Auth'


export abstract class Strategy {

    storageManager = new StorageManager(localStorage)

    constructor(){}

    abstract login(loginData: ILoginUser): Promise<any>

    abstract isLogined(): Promise<boolean>

    setAuthStoragedData(data: TAuthData): boolean{
        return this.storageManager.saveAuthData(data)
    }
    getAuthStoragedData(): TAuthData{
        return this.storageManager.getAuthData()
    }
    removeAuthStoragedData(): boolean{
        return this.storageManager.removeAuthData()
    }
}