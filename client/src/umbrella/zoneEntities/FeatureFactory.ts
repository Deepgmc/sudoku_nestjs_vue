import type { IRawFeature, TRawAction } from "@/interfaces/MapInterfaces"
import { ActionsFactory } from "../actions/ActionsFactory"
import { Homeless } from "./FeatureObjects/Homeless"
import { Portal } from "./FeatureObjects/Portal"
import { PortalGuard } from "./FeatureObjects/PortalGuard"
import Inventory from "../items/Inventory"
import type FeatureEntity from "./FeatureObjects/FeatureEntity"


export function FeatureFactory (
    featureRaw: IRawFeature
): FeatureEntity {
    let featureEntity: FeatureEntity | null
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
            return ActionsFactory(rawAction, featureEntity)
        })

    //hydrating feature items
    featureEntity.inventory = new Inventory(featureRaw.items, 5)

    return featureEntity
}