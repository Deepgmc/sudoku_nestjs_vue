import type { TRegisterForm } from '@/interfaces/user'

export enum availableStrategies {
    'jwt'
}

export interface IAuthManager {

    /**
     * тип авторизации
     */
    strategy: string | null
    /**
     * какие вообще бывают стратегии авторизации
     */
    availableStrategies: typeof availableStrategies

    /**
     * авторизован ли юзер, любыми стратегиями
     */
    //_isLogined: boolean

    /**
     * Регистрация юзера. Стратегии пока не при чем
     */
    //FIXME remove any
    register: (registerData: TRegisterForm) => Promise<any> | Error

    /**
     * Авторизация по логину и паролю
     * @param username
     * @param password
     * @returns
     */
    logInDefault: (username: string, password: string) => boolean

    /**
     * Выйти из системы, удалив авторизационные данные из стора
     * @returns успех разлогирования
     */
    logOut: () => void;

}

export type jwtTokenType = string | null