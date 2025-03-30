import type { IRawFeature, TRawActions } from "@/interfaces/MapInterfaces";
import FeatureEntity from "./FeatureEntity";

export class Homeless extends FeatureEntity {

    textName: string = 'БОМЖ'
    public defaultEntityActions: TRawActions = []
    public isUnit = true


    constructor(featureRaw: IRawFeature){
        super(featureRaw)
    }

    defaultActions = ['fight', 'talk', 'rob']

    getFeatureInfoIcon(){
        return '&#x1F6B6;'
    }
}