import type { IRawFeature, TRawActions } from "@/interfaces/MapInterfaces";
import FeatureEntity from "./FeatureEntity";

export class Portal extends FeatureEntity {

    textName: string = 'Переход в другую зону'
    public defaultEntityActions: string[] = []
    public isUnit = false

    constructor(featureRaw: IRawFeature){
        super(featureRaw)
    }

    defaultActions = []

    getFeatureInfoIcon(){
        return '&#x1F300;'
    }
}