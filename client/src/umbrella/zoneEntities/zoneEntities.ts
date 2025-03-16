export type TObjectNames = keyof typeof entitiesOptions

export type entity = {
    passability: boolean,
    backgroundImage: string,
    backgroundClass: string,
    actions: Function[] | string[]
}

export const entitiesOptions = {
    'fence': {
        passability: false,
        backgroundImage: 'fenceImg',
        backgroundClass: 'fenceIron',
        actions: [],
    },
    'sideStreet': {
        passability: true,
        backgroundImage: 'sideStreetImg',
        backgroundClass: 'sideStreet',
        actions: [],
    },
    'houseDump': {
        passability: false,
        backgroundImage: 'sideStreetDumpImg', //1F5D1
        backgroundClass: 'houseDump',
        actions: ['digIn'],
    },
    'house': {
        passability: false,
        backgroundImage: 'houseImg',//1F3E2
        backgroundClass: 'houseResidental',
        actions: ['lookIn'],
    },
}