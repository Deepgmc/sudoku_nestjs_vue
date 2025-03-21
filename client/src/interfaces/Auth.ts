import type { ILoginUser, TRegisterForm } from '@/interfaces/user'
import type { jwtStrategy } from '@/auth/strategies/jwt.strategy'

export type jwtTokenType = string | null

export type TAuthData = {
    access_token: jwtTokenType
}

export type TStrategies = jwtStrategy | null //     | anotherStrategy | thirdStrategy

export enum availableStrategies {
    'jwt'
}

export interface IAuthManager {

    /**
     Current strategy
     */
    _strategy: TStrategies
    //setStrategy: (s: IAuthManager['_strategy']) => void
    /**
     * What types of strategies we have
     */
    availableStrategies: typeof availableStrategies

    /**
     * User registration. Sends query to a server
     */
    registerRequest: (registerData: TRegisterForm) => Promise<any>

    /**
     * User login. Sends Query to a server
     * @param username
     * @param password
     * @returns
     */
    loginRequest: (loginData: ILoginUser) => Promise<any>

    /**
     * SHORT client-side status logined or not. Unsafe - do not checks the server
     */
    isLogined: boolean

    /**
     * checks AND UPDATES isLogin status
     */
    updateAndGetIsLogined(): Promise<boolean>

    /**
     * Выйти из системы, удалив авторизационные данные из стора
     * @returns успех разлогирования
     */
    logOut: () => boolean


}