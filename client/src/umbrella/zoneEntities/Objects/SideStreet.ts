import type { TCellFeatures } from "@/interfaces/MapInterfaces"
import CellEntity from "../CellEntity.ts"
import type { TObjectNames } from "../zoneEntities.ts"

export default class SideStreet extends CellEntity {
    constructor(objectName: TObjectNames, options: any, mapCellFeatures: TCellFeatures){
        super(objectName, options, mapCellFeatures)
    }
    generateInfoIcons(){return []}

    getInfoDescription(){
        const text: string[] = []
        text.push('Обычная асфальтированная придомная территория. Асфальт, конечно, очень условен.')
        return text.join(' ')
    }

    getFeaturesInfo(){
        const text: string[] = this.features.map(feature => {
            return this.getFeatureText(feature)
        })
        return text.join(' ')
    }
}