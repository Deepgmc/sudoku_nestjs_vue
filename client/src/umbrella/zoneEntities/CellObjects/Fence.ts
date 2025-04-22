import type { ICellObject, TCellRawFeatures, TCellRawUnits, TCoords } from "@/interfaces/MapInterfaces"
import CellEntity from "./CellEntity.ts"

export default class Fence extends CellEntity {

    public passability: boolean = false
    public canDig: boolean = false
    public backgroundClass: string = 'fenceIron'
    public defaultEntityActions: string[] = []
    public textName: string = 'Забор'
    public chatDescription = 'Ограждение металлическое, проржавелое, краска облуплена. Высокое, выглядит прочно, не перебраться'

    constructor(
        objectName: ICellObject,
        mapCellFeatures: TCellRawFeatures,
        mapCellUnits: TCellRawUnits,
        coords: TCoords
    ){
        super(objectName, mapCellFeatures, mapCellUnits, coords)
    }
    generateInfoIcons(){return []}

    getInfoDescription(){
        const text: string[] = []
        text.push(this.chatDescription)
        return text.join(' ')
    }
}