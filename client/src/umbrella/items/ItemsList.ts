import { SLOT_TYPES, ITEM_TYPES } from "@/interfaces/ItemsInterfaces";

export const items = {
    pants: {
        description: 'Мятые и грязные. Возможно, защитят от крапивы.',
        icon: '&#128086', //1F456
        textName: 'Штаны',
        type: ITEM_TYPES.CLOTHES,
        slotType: SLOT_TYPES.LEGS,
        add_health: 5,
        armor: 1,
        intellect: 1,
        strength: 1,
    },
    shirt: {
        description: 'Мятая и грязная. От ветра немного прикроет.',
        icon: '&#128085',
        textName: 'Футболка',
        type: ITEM_TYPES.CLOTHES,
        slotType: SLOT_TYPES.BODY,
        add_health: 5,
        armor: 1,
        strength: 1,
    },
    armorMez: {
        description: 'Мезоструктурная ионная квадротрансферическая броня.',
        icon: '&#128090',
        textName: 'Броня корпорации',
        type: ITEM_TYPES.CLOTHES,
        slotType: SLOT_TYPES.BODY,
        add_health: 100,
        armor: 10,
        intellect: 7,
        strength: 10,
        agility: 2,
    },

    //weapons
    knife: {
        description: 'Нож кухонный, конечно незаточенный.',
        icon: '&#128298',
        textName: 'Нож',
        type: ITEM_TYPES.WEAPON,
        slotType: SLOT_TYPES.RHAND,
        damage: 5,
    },
    shovel: {
        description: 'Лопата штыковая. Землю копать можно.',
        icon: '&#129679',
        textName: 'Лопата',
        type: ITEM_TYPES.WEAPON,
        slotType: SLOT_TYPES.RHAND,
        damage: 2,
    },
    lazerBlaster: {
        description: 'Лазерный ионный квадротрансферический бластер.',
        icon: '&#128297',
        textName: 'Бластер',
        type: ITEM_TYPES.WEAPON,
        slotType: SLOT_TYPES.RHAND,
        damage: 30,
    },

    //food
    water: {
        description: 'Питьевая чистая вода.',
        icon: '&#127862', //1F376
        textName: 'Вода',
        type: ITEM_TYPES.FOOD,
        slotType: SLOT_TYPES.INV_ONLY,
        hp_regen: 5,
    },
    bug: {
        description: 'С голоду чего только не съешь. Белок все-таки',
        icon: '&#129714',
        textName: 'Жук',
        type: ITEM_TYPES.FOOD,
        slotType: SLOT_TYPES.INV_ONLY,
        hp_regen: 15,
    },
    berry: {
        description: 'Высохшая, но вроде есть можно',
        icon: '&#129744',
        textName: 'Ягода',
        type: ITEM_TYPES.FOOD,
        slotType: SLOT_TYPES.INV_ONLY,
        hp_regen: 10,
    },
    acorn: {
        description: 'Съедобно, раз животные едят',
        icon: '&#129684',
        textName: 'Желудь',
        type: ITEM_TYPES.FOOD,
        slotType: SLOT_TYPES.INV_ONLY,
        hp_regen: 5,
    },

    //different
    umbrellaBadge: {
        description: 'На лицевой стороне красуется логотип корпорации Umbrella, на обратной - всё размыло водой и грязью, ничего не разобрать.',
        icon: '&#128220',
        textName: 'Удостоверение',
        type: ITEM_TYPES.MISC,
        slotType: SLOT_TYPES.INV_ONLY,
    },
}