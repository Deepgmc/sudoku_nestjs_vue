export type TObjectNames = keyof typeof entitiesOptions

export const entitiesOptions = {
    'fence': {
        passability: false,
        backgroundImage: 'fenceImg',
        actions: [],
    },
    'sideStreet': {
        passability: true,
        backgroundImage: 'sideStreetImg',
        actions: [],
    },
    'houseDump': {
        passability: false,
        backgroundImage: 'sideStreetDumpImg',
        actions: ['digIn'],
    },
    'house': {
        passability: false,
        backgroundImage: 'houseImg',
        actions: ['lookIn'],
    },
}