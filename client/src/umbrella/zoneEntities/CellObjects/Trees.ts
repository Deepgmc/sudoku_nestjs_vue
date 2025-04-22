import type { ICellObject, TCellRawFeatures, TCellRawUnits, TCoords } from "@/interfaces/MapInterfaces"
import CellEntity from "./CellEntity.ts"

export default class Trees extends CellEntity {

    public passability: boolean = true
    public canDig: boolean = true
    public backgroundClass: string = 'trees'
    public defaultEntityActions: string[] = ['dig']
    public textName: string = 'Парковая зона'
    public chatDescription = 'Деревья, кусты, трава. Ничего интересного на поверхности не видно. Но обычно в таких местах люди закапывали ценное имущество, расчитывая потом сюда вернуться.'

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
        text.push('Деревья, невысокая трава, всякий мусор, земля.')
        return text.join(' ')
    }
}