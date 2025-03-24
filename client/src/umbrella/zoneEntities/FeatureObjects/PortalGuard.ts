import type { IRawFeature, TRawActions } from "@/interfaces/MapInterfaces";
import FeatureEntity from "./FeatureEntity";

export class PortalGuard extends FeatureEntity {

    textName: string = 'Охранник портала'
    public defaultEntityActions: string[] = []
    public mapFeatureActions: TRawActions = []

    constructor(featureRaw: IRawFeature){
        super(featureRaw)
        this.mapFeatureActions = featureRaw.actions
    }

    defaultActions = ['fight', 'talk', 'rob']

    getFeatureInfoIcon(){
        return '&#x1F93A;'
    }
}