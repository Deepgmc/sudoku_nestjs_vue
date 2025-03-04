import type { ILoginUser, TRegisterForm } from '@/interfaces/user'

export enum availableStrategies {
    'jwt'
}

export interface IAuthManager {

    /**
     Current strategy
     */
    _strategy: string | null
    setStrategy: (s: IAuthManager['_strategy']) => void
    /**
     * What types of strategies we have
     */
    availableStrategies: typeof availableStrategies

    /**
     * Depends on strategy: logins current user, saving authorisation data
       Do not use directly. Use loginRequest() instead
     * @returns saved login status or no
     */
    _login: () => boolean

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
     * Авторизация по логину и паролю
     * @param username
     * @param password
     * @returns
     */
    loginJwt: (loginData: ILoginUser) => Promise<any>

    /**
     * Выйти из системы, удалив авторизационные данные из стора
     * @returns успех разлогирования
     */
    logOut: () => void

}

export type jwtTokenType = string | null