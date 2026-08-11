import type { ILoginUser } from '@/interfaces/user'
import { StorageManager } from '@/storage/LocalStorageManager'
import { type TAuthData } from '@/interfaces/Auth'
import type { TServerStatus } from '@/interfaces/Error'

type isLoginedResultSuccess = {
  isLogined: true,
  userId: number
}
type isLoginedResultFail = {
  isLogined : false
}

export type isLoginedResult = isLoginedResultSuccess | isLoginedResultFail

export abstract class Strategy {

    static storageManager = new StorageManager(localStorage)

    constructor(){}

    abstract login(loginData: ILoginUser): Promise<any>

    abstract isLogined(): Promise<TServerStatus>

    setAuthStoragedData(data: TAuthData): boolean {
        return Strategy.storageManager.saveAuthData(data)
    }
    static getAuthStoragedData(): TAuthData {
        return Strategy.storageManager.getAuthData()
    }
    removeAuthStoragedData(): boolean {
        return Strategy.storageManager.removeAuthData()
    }
}