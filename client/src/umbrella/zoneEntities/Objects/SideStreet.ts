import type { ICellObject, TCellFeatures } from "@/interfaces/MapInterfaces"
import CellEntity from "../CellEntity.ts"

export default class SideStreet extends CellEntity {

    public passability: boolean = true
    public backgroundClass: string = 'sideStreet'
    public actions: string[] = []
    public textName: string = 'Дорога'

    constructor(objectName: ICellObject, mapCellFeatures: TCellFeatures){
        super(objectName, mapCellFeatures)
    }
    generateInfoIcons(){return []}

    getInfoDescription(){
        const text: string[] = []
        text.push('Обычная асфальтированная придомная территория. Асфальт, конечно, очень условен.')
        return text.join(' ')
    }

    getFeaturesInfo(){
        const text: string[] = this.mapRawFeatures.map(feature => {
            return this.getFeatureText(feature)
        })
        return text.join(' ')
    }
}