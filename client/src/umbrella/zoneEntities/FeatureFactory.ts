import type { IRawFeature, IFeature, TRawAction } from "@/interfaces/MapInterfaces"
import { ActionsFactory } from "../actions/ActionsFactory"
import { Homeless } from "./FeatureObjects/Homeless"
import { Portal } from "./FeatureObjects/Portal"
import { PortalGuard } from "./FeatureObjects/PortalGuard"


export function FeatureFactory (
    featureRaw: IRawFeature
): IFeature {
    let featureEntity: IFeature | null
    try {
        //featureEntity = eval(`new ${capitalizeFirstLetter(featureRaw.name)}(featureRaw)`)
        switch(featureRaw.name){
            case 'homeless':
                featureEntity = new Homeless(featureRaw)
                break;
            case 'portal':
                featureEntity = new Portal(featureRaw)
                break;
            case 'portalGuard':
                featureEntity = new PortalGuard(featureRaw)
                break;
            default:
                featureEntity = null
        }
    } catch(_e: any) {
        throw new Error('Invalid FeatureFactory creation ' + featureRaw.name)
    }
    if(featureEntity === null) throw new Error('Invalid EntityFactory creation ' + featureRaw.name)

    //hydrating actions for this feature
    featureEntity.actions = featureEntity.defaultActions.concat(featureEntity.generalDefaultActions, featureEntity.defaultEntityActions, featureEntity.mapFeatureActions)
        .map((rawAction: TRawAction) => {
            return ActionsFactory(rawAction)
        })

    return featureEntity
}

function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}