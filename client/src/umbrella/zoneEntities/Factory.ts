import {entitiesOptions, type TObjectNames} from './zoneEntities.ts'

export function CellEntityFactory (
    name: TObjectNames, //obj class                    name: 'house12',
    options: any, //map-side params (from a file)      options: {orientation: 'e-w', floor: 16, isEntrance: false }
): CellEntity {
    let cellEntity: CellEntity | null = null
    switch (name) {
        case 'house':
            cellEntity = new House(name, options)
            break;
        case 'fence':
            cellEntity = new Fence(name, options)
            break;
        case 'houseDump':
            cellEntity = new HouseDump(name, options)
            break;
        case 'sideStreet':
            cellEntity = new SideStreet(name, options)
            break;
        default:
            throw new Error('Invalid name at EntityFactory')
    }
    if(cellEntity === null) throw new Error('Invalid EntityFactory creation')
    return cellEntity
}


export abstract class CellEntity {
    constructor(
        public objectName: TObjectNames,
        orientation?: string
    ){
        const objKey: TObjectNames = this.objectName
        this.objectName = objectName
        this.passability = entitiesOptions[objKey].passability
        this.backgroundImage = entitiesOptions[objKey].backgroundImage
        this.backgroundClass = entitiesOptions[objKey].backgroundClass
        this.actions = entitiesOptions[objKey].actions
        if(orientation) this.orientation = orientation; else this.orientation = '' //some cells do not need orientation
    }
    public orientation: string
    public passability: boolean
    public backgroundImage: string
    public backgroundClass: string
    public actions: string[]
}

class House extends CellEntity {
    public floors: number
    public isEntrance: boolean
    constructor(objectName: TObjectNames, options: any){
        super(objectName, options.orientation)
        this.floors = options.floor
        this.isEntrance = options.isEntrance
    }
}
class HouseDump extends CellEntity {
    constructor(objectName: TObjectNames, options: any){
        super(objectName, options.orientation)
    }
}
class Fence extends CellEntity {
    constructor(objectName: TObjectNames, options: any){
        super(objectName, options.orientation)
    }
}
class SideStreet extends CellEntity {
    constructor(objectName: TObjectNames, options: any){
        super(objectName, options.orientation)
    }
}