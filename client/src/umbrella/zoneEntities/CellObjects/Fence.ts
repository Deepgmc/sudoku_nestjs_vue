import type { ICellObject, TCellRawFeatures, TCoords } from "@/interfaces/MapInterfaces"
import CellEntity from "./CellEntity.ts"

export default class Fence extends CellEntity {

    public passability: boolean = false
    public backgroundClass: string = 'fenceIron'
    public defaultEntityActions: string[] = []
    public textName: string = 'Забор'

    constructor(objectName: ICellObject, mapCellFeatures: TCellRawFeatures, coords: TCoords){
        super(objectName, mapCellFeatures, coords)
    }
    generateInfoIcons(){return []}

    getInfoDescription(){
        const text: string[] = []
        text.push('Металлический, проржавелый, краска облуплена. Но высокий, выглядит прочно.')
        return text.join(' ')
    }
}