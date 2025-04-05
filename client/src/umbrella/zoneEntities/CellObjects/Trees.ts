import type { ICellObject, TCellRawFeatures, TCoords } from "@/interfaces/MapInterfaces"
import CellEntity from "./CellEntity.ts"

export default class Trees extends CellEntity {

    public passability: boolean = true
    public backgroundClass: string = 'trees'
    public defaultEntityActions: string[] = ['look', 'dig']
    public textName: string = 'Парковая зона'
    public chatDescription = 'Деревья, кусты, трава. Ничего интересного на поверхности не видно. Но обычно в таких местах люди закапывали ценное имущество, расчитывая потом сюда вернуться.'

    constructor(objectName: ICellObject, mapCellFeatures: TCellRawFeatures, coords: TCoords){
        super(objectName, mapCellFeatures, coords)
    }
    generateInfoIcons(){return []}

    getInfoDescription(){
        const text: string[] = []
        text.push('Деревья, невысокая трава, всякий мусор, земля.')
        return text.join(' ')
    }
}