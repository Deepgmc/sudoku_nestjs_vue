import type { ICellObject, TCellRawFeatures, TCoords, TRawActions } from "@/interfaces/MapInterfaces"
import CellEntity from "./CellEntity.ts"

export default class HouseDump extends CellEntity {

    public passability: boolean = false
    public backgroundClass: string = 'houseDump'
    public defaultEntityActions: TRawActions = []
    public textName: string = 'Мусорка'
    public chatDescription = 'Придомная мусорка. Всё ценное скорее всего вынесли, но вдруг остались какие-нибудь крысиные лапки?'

    constructor(objectName: ICellObject, mapCellFeatures: TCellRawFeatures, coords: TCoords){
        super(objectName, mapCellFeatures, coords)
    }
    generateInfoIcons(){return []}

    getInfoDescription(){
        const text: string[] = []
        text.push('Это место использовали для свалки, сюда радостные жители несли кучу всякой полезной всячины.')
        return text.join(' ')
    }
}