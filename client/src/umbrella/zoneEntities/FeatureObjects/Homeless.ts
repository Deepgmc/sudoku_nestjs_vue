import type { IRawFeature, TRawActions } from "@/interfaces/MapInterfaces";
import FeatureEntity from "./FeatureEntity";

export class Homeless extends FeatureEntity {

    textName: string = 'Бомж'
    public defaultEntityActions: TRawActions = []
    public isUnit = true
    public chatDescription = 'На вас смотрит какой-то бомж, грязный, вонючий. Его можно ограбить или поговорить (если он умеет)'

    constructor(featureRaw: IRawFeature){
        super(featureRaw)
    }

    defaultActions = ['fight', 'talk', 'rob']

    getFeatureInfoIcon(){
        return {icon: '&#x1F6B6;', description: this.textName}
    }
}