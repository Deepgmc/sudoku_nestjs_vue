import { type TCellActions } from "@/interfaces/MapInterfaces"
import type PlayerManager from "../PlayerManager"

export type TObjectNames = keyof typeof entitiesOptions

export type entity = {
    passability: boolean,
    backgroundImage: string,
    backgroundClass: string,
    actions: TCellActions,
    player: PlayerManager | null
}

/**
 * настройки объектов карты стандартные
   используются для гидрации структуры, пришедшей с сервера для заполнения её объектами
 */
export const entitiesOptions = {
    'house': {
        passability: false,
        backgroundClass: 'houseResidental',
        actions: ['lookWindow'],
    },
    'fence': {
        passability: false,
        backgroundClass: 'fenceIron',
        actions: [],
    },
    'sideStreet': {
        passability: true,
        backgroundClass: 'sideStreet',
        actions: [],
    },
    'houseDump': {
        passability: false,
        backgroundClass: 'houseDump',
        actions: ['dig'],
    },
    'trees': {
        passability: true,
        backgroundClass: 'trees',
        actions: ['look', 'dig'],
    },
}