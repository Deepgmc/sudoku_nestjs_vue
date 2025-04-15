import { SLOT_TYPES } from "@/interfaces/ItemsInterfaces";

export const items = {
    pants: {
        description: 'Мятые и грязные. Возможно, защитят от крапивы.',
        icon: '&#128086', //1F456
        textName: 'Штаны',
        slotType: SLOT_TYPES.LEGS,
        add_health: 5,
        intellect: 1,
    },
    knife: {
        description: 'Нож кухонный, конечно незаточенный.',
        icon: '&#128298',
        textName: 'Нож',
        slotType: SLOT_TYPES.RHAND,
        damage: 5,
    },
    shirt: {
        description: 'Мятая и грязная. От ветра немного прикроет.',
        icon: '&#128085',
        textName: 'Футболка',
        slotType: SLOT_TYPES.BODY,
        add_health: 5,
        intellect: 1,
    },
    umbrellaBadge: {
        description: 'На лицевой стороне красуется логотип корпорации Umbrella, на обратной - всё размыло водой и грязью, ничего не разобрать.',
        icon: '&#128220',
        textName: 'Удостоверение',
        slotType: SLOT_TYPES.INV_ONLY,
    },
    lazerBlaster: {
        description: 'Лазерный ионный квадротрансферический бластер.',
        icon: '&#128297',
        textName: 'Бластер',
        slotType: SLOT_TYPES.RHAND,
        damage: 30,
    },
    armorMez: {
        description: 'Мезоструктурная ионная квадротрансферическая броня.',
        icon: '&#128090',
        textName: 'Броня',
        slotType: SLOT_TYPES.BODY,
        add_health: 100,
    },
    shovel: {
        description: 'Лопата штыковая. Землю копать можно.',
        icon: '&#129679',
        textName: 'Лопата',
        slotType: SLOT_TYPES.RHAND,
    },

    //food
    water: {
        description: 'Питьевая чистая вода.',
        icon: '&#127862', //1F376
        textName: 'Вода',
        slotType: SLOT_TYPES.INV_ONLY,
        hp_regen: 5,
    },
    bug: {
        description: 'С голоду чего только не съешь. Белок все-таки',
        type: 'food',
        icon: '&#129714',
        textName: 'Жук',
        slotType: SLOT_TYPES.INV_ONLY,
    },
    berry: {
        description: 'Высохшая, но вроде есть можно',
        type: 'food',
        icon: '&#129744',
        textName: 'Ягода',
        slotType: SLOT_TYPES.INV_ONLY,
    },
    acorn: {
        description: 'Съедобно, раз животные едят',
        type: 'food',
        icon: '&#129684',
        textName: 'Желудь',
        slotType: SLOT_TYPES.INV_ONLY,
    },
}