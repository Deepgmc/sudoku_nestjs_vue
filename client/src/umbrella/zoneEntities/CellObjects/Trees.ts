import type { ICellObject, TCellRawFeatures, TCoords } from "@/interfaces/MapInterfaces"
import CellEntity from "./CellEntity.ts"

export default class Trees extends CellEntity {

    public passability: boolean = true
    public backgroundClass: string = 'trees'
    public defaultEntityActions: string[] = ['look', 'dig']
    public textName: string = 'Парковая зона'

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