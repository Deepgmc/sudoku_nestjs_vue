import type { ICellObject, TCellRawFeatures } from "@/interfaces/MapInterfaces"
import CellEntity from "./CellEntity.ts"

export default class SideStreet extends CellEntity {

    public passability: boolean = true
    public backgroundClass: string = 'sideStreet'
    public defaultEntityActions: string[] = []
    public textName: string = 'Дорога'

    constructor(objectName: ICellObject, mapCellFeatures: TCellRawFeatures){
        super(objectName, mapCellFeatures)
    }
    generateInfoIcons(){return []}

    getInfoDescription(){
        const text: string[] = []
        text.push('Обычная асфальтированная придомная территория. Асфальт, конечно, очень условен.')
        return text.join(' ')
    }
}