import type { TCellFeatures } from "@/interfaces/MapInterfaces"
import CellEntity from "../CellEntity.ts"
import type { TObjectNames } from "../zoneEntities.ts"

export default class House extends CellEntity {
    private floors: number
    private isEntrance: boolean
    constructor(objectName: TObjectNames, options: any, mapCellFeatures: TCellFeatures){
        super(objectName, options, mapCellFeatures)
        this.floors = options.floor
        this.isEntrance = options.isEntrance
        this.generateInfoIcons()
    }

    generateInfoIcons(){
        if(this.isEntrance){
            this.infoIcons.push('&#128726;')
            this.features.push('houseEntrance')
        }
    }

    getInfoDescription(){
        const text: string[] = []
        text.push('Вид мрачный, заброшенный. Окон, конечно, нет. Панельные стены выглядят вполне крепкими.')
        text.push(`Вы посчитали количество этажей, их ${this.floors}.`)
        if(!this.isEntrance) {
            text.push(`В данной части входа нет, стена и окна этажей до самого верха.`)
        } else {
            text.push(`Это парадная часть, весь пролёт до ${this.floors} этажа это, вероятно, были лифты. Вход завален хламом, но пробраться можно.`)
        }
        return text.join(' ')
    }

    getFeaturesInfo(){
        const text: string[] = this.features.map(feature => {
            return this.getFeatureText(feature)
        })
        return text.join(' ')
    }
}