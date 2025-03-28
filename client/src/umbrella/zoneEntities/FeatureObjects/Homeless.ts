import type { IRawFeature, TRawActions } from "@/interfaces/MapInterfaces";
import FeatureEntity from "./FeatureEntity";

export class Homeless extends FeatureEntity {

    textName: string = 'БОМЖ'
    public defaultEntityActions: TRawActions = []
    public mapFeatureActions: TRawActions = []

    constructor(featureRaw: IRawFeature){
        super(featureRaw)
        this.mapFeatureActions = featureRaw.actions
    }

    defaultActions = ['fight', 'talk', 'rob']

    getFeatureInfoIcon(){
        return '&#x1F6B6;'
    }
}