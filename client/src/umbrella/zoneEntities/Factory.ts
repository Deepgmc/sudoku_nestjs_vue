import type { TCellObjOptions, TCellActions } from '@/interfaces/MapInterfaces.ts';
import {entitiesOptions, type TObjectNames } from './zoneEntities.ts'
import PlayerManager from '../PlayerManager.ts';

export function CellEntityFactory (
    name: TObjectNames,
    mapOptions: TCellObjOptions,
): CellEntity {
    let cellEntity: CellEntity | null = null
    switch (name) {
        case 'house':
            cellEntity = new House(name, mapOptions)
            break;
        case 'fence':
            cellEntity = new Fence(name, mapOptions)
            break;
        case 'houseDump':
            cellEntity = new HouseDump(name, mapOptions)
            break;
        case 'sideStreet':
            cellEntity = new SideStreet(name, mapOptions)
            break;
        case 'trees':
            cellEntity = new Trees(name, mapOptions)
            break;
        default:
            throw new Error('Invalid name at EntityFactory')
    }
    if(cellEntity === null) throw new Error('Invalid EntityFactory creation')
    return cellEntity
}


export abstract class CellEntity {
    constructor(
        objectName: TObjectNames,
        mapOptions?: any
    ){
        this.objectName = objectName
        this.player = null
        const objKey: TObjectNames = this.objectName
        this.passability = entitiesOptions[objKey].passability
        this.backgroundClass = entitiesOptions[objKey].backgroundClass
        this.actions = entitiesOptions[objKey].actions//.concat(mapOptions.actions)
        if(mapOptions.orientation) this.orientation = mapOptions.orientation; else this.orientation = '' //some cells do not need orientation
    }
    public objectName: TObjectNames
    public player: PlayerManager | null
    public orientation: string
    public passability: boolean
    public backgroundClass: string
    public actions: TCellActions
}
/**
 * {
        obj: {
            name: 'house',
            options: {
                orientation: 'e-w',
                floor: 12,
                isEntrance: false
            },
        },
        features: []
    },
 */
class House extends CellEntity {
    public floors: number
    public isEntrance: boolean
    constructor(objectName: TObjectNames, options: any){
        super(objectName, options)
        this.floors = options.floor
        this.isEntrance = options.isEntrance
    }
}
class HouseDump extends CellEntity {
    constructor(objectName: TObjectNames, options: any){
        super(objectName, options)
    }
}
class Fence extends CellEntity {
    constructor(objectName: TObjectNames, options: any){
        super(objectName, options)
    }
}
class SideStreet extends CellEntity {
    constructor(objectName: TObjectNames, options: any){
        super(objectName, options)
    }
}
class Trees extends CellEntity {
    constructor(objectName: TObjectNames, options: any){
        super(objectName, options)
    }
}