import type { ICellObject, TCellRawFeatures } from "@/interfaces/MapInterfaces"
import CellEntity from "./CellEntity.ts"

export default class Fence extends CellEntity {

    public passability: boolean = false
    public backgroundClass: string = 'fenceIron'
    public defaultEntityActions: string[] = []
    public textName: string = 'Забор'

    constructor(objectName: ICellObject, mapCellFeatures: TCellRawFeatures){
        super(objectName, mapCellFeatures)
    }
    generateInfoIcons(){return []}

    getInfoDescription(){
        const text: string[] = []
        text.push('Металлический, проржавелый, краска облуплена. Но высокий, выглядит прочно.')
        return text.join(' ')
    }
}