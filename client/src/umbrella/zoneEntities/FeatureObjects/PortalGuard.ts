import type { IRawFeature, TRawActions } from "@/interfaces/MapInterfaces";
import FeatureEntity from "./FeatureEntity";

export class PortalGuard extends FeatureEntity {

    textName: string = 'Охранник портала'
    public defaultEntityActions: string[] = []
    public isUnit = true

    constructor(featureRaw: IRawFeature){
        super(featureRaw)
    }

    defaultActions = ['fight', 'talk', 'rob']

    getFeatureInfoIcon(){
        return '&#x1F93A;'
    }
}