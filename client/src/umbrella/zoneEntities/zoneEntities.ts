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
        textName: `Жилое здание`,
    },
    'fence': {
        passability: false,
        backgroundClass: 'fenceIron',
        actions: [],
        textName: `Забор`,
    },
    'sideStreet': {
        passability: true,
        backgroundClass: 'sideStreet',
        actions: [],
        textName: `Дорога`,
    },
    'houseDump': {
        passability: false,
        backgroundClass: 'houseDump',
        actions: ['dig'],
        textName: `Мусорка`,
    },
    'trees': {
        passability: true,
        backgroundClass: 'trees',
        actions: ['look', 'dig'],
        textName: `Парковая зона`,
    },
}