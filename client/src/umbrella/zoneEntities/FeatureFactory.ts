import { reactive } from "vue"
import type { TRawAction } from "@/interfaces/MapInterfaces"
import { ActionsFactory } from "../actions/ActionsFactory"
import { Portal } from "./FeatureObjects/Portal"

import Inventory from "../items/Inventory"
import type FeatureEntity from "./FeatureObjects/FeatureEntity"
import type { IRawFeature } from "@/interfaces/Unit"


export function FeatureFactory (
    featureRaw: IRawFeature
): FeatureEntity {
    let featureEntity: FeatureEntity | null
    try {
        switch(featureRaw.name){
            case 'portal':
                featureEntity = new Portal(featureRaw)
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
    featureEntity.inventory = reactive(new Inventory(featureRaw.items, false, 5))

    return featureEntity
}