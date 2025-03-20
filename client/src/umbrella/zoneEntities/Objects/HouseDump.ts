import type { ICellObject, TCellFeatures } from "@/interfaces/MapInterfaces"
import CellEntity from "../CellEntity.ts"

export default class HouseDump extends CellEntity {

    public passability: boolean = false
    public backgroundClass: string = 'houseDump'
    public actions: string[] = ['dig']
    public textName: string = 'Мусорка'

    constructor(objectName: ICellObject, mapCellFeatures: TCellFeatures){
        super(objectName, mapCellFeatures)
    }
    generateInfoIcons(){return []}

    getInfoDescription(){
        const text: string[] = []
        text.push('Сюда радостные жители свалилвали кучу всякой всячины.')
        return text.join(' ')
    }

    getFeaturesInfo(){
        const text: string[] = this.mapRawFeatures.map(feature => {
            return this.getFeatureText(feature)
        })
        return text.join(' ')
    }
}