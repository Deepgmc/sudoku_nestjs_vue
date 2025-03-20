import type { ICellObject, TCellFeatures } from "@/interfaces/MapInterfaces"
import CellEntity from "../CellEntity.ts"

export default class Trees extends CellEntity {

    public passability: boolean = true
    public backgroundClass: string = 'trees'
    public actions: string[] = ['look', 'dig']
    public textName: string = 'Парковая зона'

    constructor(objectName: ICellObject, mapCellFeatures: TCellFeatures){
        super(objectName, mapCellFeatures)
    }
    generateInfoIcons(){return []}

    getInfoDescription(){
        const text: string[] = []
        text.push('Деревья, невысокая трава, всякий мусор, земля.')
        return text.join(' ')
    }

    getFeaturesInfo(){
        const text: string[] = this.mapRawFeatures.map(feature => {
            return this.getFeatureText(feature)
        })
        return text.join(' ')
    }
}