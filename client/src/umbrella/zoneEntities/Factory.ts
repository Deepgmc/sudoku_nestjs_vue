import type { TCellObjOptions, TCellActions, TCellFeatures } from '@/interfaces/MapInterfaces.ts';
import {entitiesOptions, type TObjectNames } from './zoneEntities.ts'
import PlayerManager from '../PlayerManager.ts';

export function CellEntityFactory (
    name: TObjectNames,
    mapCellOptions: TCellObjOptions,
    mapCellFeatures: TCellFeatures,
): CellEntity {
    let cellEntity: CellEntity | null = null
    switch (name) {
        case 'house':
            cellEntity = new House(name, mapCellOptions, mapCellFeatures)
            break;
        case 'fence':
            cellEntity = new Fence(name, mapCellOptions, mapCellFeatures)
            break;
        case 'houseDump':
            cellEntity = new HouseDump(name, mapCellOptions, mapCellFeatures)
            break;
        case 'sideStreet':
            cellEntity = new SideStreet(name, mapCellOptions, mapCellFeatures)
            break;
        case 'trees':
            cellEntity = new Trees(name, mapCellOptions, mapCellFeatures)
            break;
        default:
            throw new Error('Invalid name at EntityFactory')
    }
    if(cellEntity === null) throw new Error('Invalid EntityFactory creation')
    return cellEntity
}

//замена ячейки на новую
// setTimeout(() => {
//     const newItem = CellEntityFactory('house' as TObjectNames, {
//         orientation: 's-w',
//         floor: 12,
//         isEntrance: false,
//         actions: ['A1', 'A2']
//     })
//     zoneManager.store.setNewItem(newItem)
// }, 2000)

export abstract class CellEntity {
    constructor(
        objectName: TObjectNames,
        mapOptions: any,
        mapCellFeatures: TCellFeatures
    ){
        this.objectName = objectName
        this.player = null
        const objKey: TObjectNames = this.objectName
        this.passability = entitiesOptions[objKey].passability
        this.backgroundClass = entitiesOptions[objKey].backgroundClass
        this.actions = entitiesOptions[objKey].actions//.concat(mapOptions.actions)
        if(mapOptions.orientation) this.orientation = mapOptions.orientation; else this.orientation = '' //some cells do not need orientation
        this.features = mapCellFeatures

        this.features.forEach(f => {
            this.infoIcons.push(this.getFeatureInfoIcon(f))
        })
    }
    public objectName: TObjectNames
    public player: PlayerManager | null
    public orientation: string
    public passability: boolean
    public backgroundClass: string
    public actions: TCellActions
    public infoIcons: string[] = []
    public features: TCellFeatures

    abstract generateInfoIcons(): void

    getFeatureInfoIcon(type: string){
        let icon = ''
        switch (type) {
            case 'portal':
                icon = '&#x25CE;'
                break;
            case 'homeless':
                icon = '&#x1F6B6;'
                break;

            default:
                break;
        }
        return icon
    }
}

class House extends CellEntity {
    private floors: number
    private isEntrance: boolean
    constructor(objectName: TObjectNames, options: any, mapCellFeatures: TCellFeatures){
        super(objectName, options, mapCellFeatures)
        this.floors = options.floor
        this.isEntrance = options.isEntrance
        this.generateInfoIcons()
    }

    generateInfoIcons(){
        if(this.isEntrance){
            this.infoIcons.push('&#128726;')
        }
    }
}
class HouseDump extends CellEntity {
    constructor(objectName: TObjectNames, options: any, mapCellFeatures: TCellFeatures){
        super(objectName, options, mapCellFeatures)
    }
    generateInfoIcons(){return []}
}
class Fence extends CellEntity {
    constructor(objectName: TObjectNames, options: any, mapCellFeatures: TCellFeatures){
        super(objectName, options, mapCellFeatures)
    }
    generateInfoIcons(){return []}
}
class SideStreet extends CellEntity {
    constructor(objectName: TObjectNames, options: any, mapCellFeatures: TCellFeatures){
        super(objectName, options, mapCellFeatures)
    }
    generateInfoIcons(){return []}
}
class Trees extends CellEntity {
    constructor(objectName: TObjectNames, options: any, mapCellFeatures: TCellFeatures){
        super(objectName, options, mapCellFeatures)
    }
    generateInfoIcons(){return []}
}