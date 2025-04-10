import { IEquiped } from "../interfaces/player.interface"

export const player = {
    level: 1,
    experience: 0,
    cash: 0,

    health: 10,
    strength: 5,
    agility: 5,
    intellect: 5,

    districtX: 3,
    districtY: 1,
    zoneX: 1,
    zoneY: 2,
    x: 1,
    y: 3
}

export const inventory = [
    {name: 'water_bottle', quantity: 1},
    {name: 'shirt_01', quantity: 1},
]

export const equiped: IEquiped = {
    head: {name: '', quantity: 0},
    body: {name: '', quantity: 0},
    legs: {name: 'pants_01', quantity: 1},
    rhand: {name: '', quantity: 0},
    lhand: {name: '', quantity: 0},
}

export const playerRatios = {
    experienceMultiplierPerLevel: 2
}