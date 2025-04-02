import type { ICellObject, TCellRawFeatures, TCoords, TRawActions } from "@/interfaces/MapInterfaces"
import CellEntity from "./CellEntity.ts"

export default class HouseDump extends CellEntity {

    public passability: boolean = false
    public backgroundClass: string = 'houseDump'
    public defaultEntityActions: TRawActions = ['dig']
    public textName: string = 'Мусорка'

    constructor(objectName: ICellObject, mapCellFeatures: TCellRawFeatures, coords: TCoords){
        super(objectName, mapCellFeatures, coords)
    }
    generateInfoIcons(){return []}

    getInfoDescription(){
        const text: string[] = []
        text.push('Сюда радостные жители свалилвали кучу всякой всячины.')
        return text.join(' ')
    }
}