import type { ICellObject, TCellRawFeatures, TCoords } from "@/interfaces/MapInterfaces"
import CellEntity from "./CellEntity.ts"

export default class SideStreet extends CellEntity {

    public passability: boolean = true
    public backgroundClass: string = 'sideStreet'
    public defaultEntityActions: string[] = []
    public textName: string = 'Дорога'

    constructor(objectName: ICellObject, mapCellFeatures: TCellRawFeatures, coords: TCoords){
        super(objectName, mapCellFeatures, coords)
    }
    generateInfoIcons(){return []}

    getInfoDescription(){
        const text: string[] = []
        text.push('Обычная асфальтированная придомная территория. Асфальт, конечно, очень условен.')
        return text.join(' ')
    }
}