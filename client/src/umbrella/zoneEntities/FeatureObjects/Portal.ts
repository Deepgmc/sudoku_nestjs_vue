import type { IRawFeature, TRawActions } from "@/interfaces/MapInterfaces";
import FeatureEntity from "./FeatureEntity";

export class Portal extends FeatureEntity {

    textName: string = 'Переход в другую зону'
    public defaultEntityActions: string[] = []
    public mapFeatureActions: TRawActions = []

    constructor(featureRaw: IRawFeature){
        super(featureRaw)
        this.mapFeatureActions = featureRaw.actions
    }

    defaultActions = []

    getFeatureInfoIcon(){
        return '&#x1F300;'
    }
}