import type { ICellObject, TCellRawFeatures, TCoords } from "@/interfaces/MapInterfaces"
import CellEntity from "./CellEntity.ts"

export default class SideStreet extends CellEntity {

    public passability: boolean = true
    public backgroundClass: string = 'sideStreet'
    public defaultEntityActions: string[] = []
    public textName: string = 'Дорога'
    public chatDescription = `Обычная асфальтированная придомная территория, правда асфальта остались только отдельные куски.
    Ходить можно, и хватит. Копать не получится. Или нужен инструмент посерьёзнее`

    constructor(objectName: ICellObject, mapCellFeatures: TCellRawFeatures, coords: TCoords){
        super(objectName, mapCellFeatures, coords)
    }
    generateInfoIcons(){return []}

    getInfoDescription(){
        const text: string[] = []
        text.push(this.chatDescription)
        return text.join(' ')
    }
}