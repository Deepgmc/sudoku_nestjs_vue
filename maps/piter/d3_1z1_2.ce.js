export const zone = {
    level: 1,
    zoneName: 'Дом',
    zoneCells: [
        [//HOME PORTAL
            {
                obj: {
                    name: 'fence',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                },
                features: [
                    {//!Portal
                        name: 'portal',
                        actions: []
                    },
                ],
                units: [
                    {//!portalGuard
                        name: 'portalGuard',
                        actions: [],
                        level: 10,
                        items: [
                            {name: 'armorMez_01', quantity: 1},
                        ],
                        equiped: {
                            head: {name: '', quantity: 0},
                            body: {name: '', quantity: 0},
                            legs: {name: '', quantity: 0},
                            rhand: {name: 'lazerBlaster_01', quantity: 1},
                            lhand: {name: '', quantity: 0},
                        }
                    },
                ]
            },
            {
                obj: {
                    name: 'house',
                    orientation: 'e-w',
                    floor: 16,
                    isEntrance: false
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'house',
                    orientation: 's-n',
                    floor: 12,
                    isEntrance: false
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'house',
                    orientation: 's-n',
                    floor: 12,
                    isEntrance: false
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'house',
                    orientation: 's-n',
                    floor: 12,
                    isEntrance: false
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'house',
                    orientation: 's-n',
                    floor: 12,
                    isEntrance: false
                },
                features: [],
                units: [],
            },
        ],
        [
            {
                obj: {
                    name: 'fence',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'house',
                    orientation: 'e-w',
                    floor: 12,
                    isEntrance: false
                },
                features: [],
                units: [],
            },
            {
                obj: {
                name: 'sideStreet',
                orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
        ],
        [
            {
                obj: {
                    name: 'fence',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'house',
                    orientation: 'e-w',
                    floor: 12,
                    isEntrance: false
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
        ],
        [//! DUMP
            {
                obj: {
                    name: 'houseDump',
                    orientation: 's-n',
                },
                features: [],
                units: [
                    {//! homeless
                        name: 'homeless',
                        actions: [],
                        items: [
                            {
                                name: 'knife_01',
                                quantity: 1
                            },
                        ],
                        equiped: {
                            head: {name: '', quantity: 0},
                            body: {name: 'shirt_01', quantity: 1},
                            legs: {name: '', quantity: 0},
                            rhand: {name: '', quantity: 0},
                            lhand: {name: '', quantity: 0},
                        }
                    }
                ],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'house',
                    orientation: 'e-w',
                    floor: 12,
                    isEntrance: false
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
        ],
        [
            {
                obj: {
                    name: 'fence',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {//!umbrella badge
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                    items: [
                        {
                            name: 'umbrellaBadge',
                            quantity: 1
                        },
                    ]
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'house',
                    orientation: 'e-w',
                    floor: 12,
                    isEntrance: false
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
        ],
        [
            {
                obj: {
                    name: 'fence',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'house',
                    orientation: 'e-w',
                    floor: 12,
                    isEntrance: false
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
        ],
        [
            {
                obj: {
                    name: 'fence',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'house',
                    orientation: 'e-w',
                    floor: 12,
                    isEntrance: false
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                },
                features: [],
                units: [
                    {//! homeless 2
                        name: 'homeless',
                        actions: [],
                        items: [
                            {
                                name: 'knife_01',
                                quantity: 1
                            },
                        ],
                        equiped: {
                            head: {name: '', quantity: 0},
                            body: {name: 'shirt_01', quantity: 1},
                            legs: {name: '', quantity: 0},
                            rhand: {name: '', quantity: 0},
                            lhand: {name: '', quantity: 0},
                        }
                    }
                ],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
        ],
        [//!HOME LOCATION (7 in array)
            {
                obj: {
                    name: 'fence',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {//!HOME ENTRANCE
                obj: {
                    name: 'house',
                    orientation: 'e-w',
                    floor: 12,
                    isEntrance: true
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                    items: [
                        {
                            name: 'shovel_01',
                            quantity: 1
                        },
                    ]
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
        ],
        [
            {
                obj: {
                    name: 'fence',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'house',
                    orientation: 'e-w',
                    floor: 12,
                    isEntrance: false
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
        ],
        [
            {
                obj: {
                    name: 'fence',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 'e-w',
                    floor: 12,
                    isEntrance: false
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'sideStreet',
                    orientation: 'e-w',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
            {
                obj: {
                    name: 'trees',
                    orientation: 's-n',
                },
                features: [],
                units: [],
            },
        ],
    ]
}