import type { ILoginUser } from '@/interfaces/user'

export abstract class Strategy {

    constructor(){}

    abstract login(loginData: ILoginUser): Promise<any>

    abstract isLogined(): boolean
}