import type MapAction from './MapAction.ts'
import type { TRawAction } from '@/interfaces/MapInterfaces.ts'
import type FeatureEntity from '../zoneEntities/FeatureObjects/FeatureEntity.ts'

import RobAction from './Rob.ts'
import MoveAction from './Move.ts'
import FightAction from './Fight.ts'
import TalkAction from './Talk.ts'
import DigAction from './Dig.ts'
import LookAction from './Look.ts'
import PickUpAction from './PickUp.ts'
import type Unit from '../zoneEntities/Units/Unit.ts'

export function ActionsFactory (
    action: TRawAction,
    object?: FeatureEntity | Unit
): MapAction {
    let actionEntity: MapAction | null = null
    try {
        switch(action){
            case 'move':
                actionEntity = new MoveAction(action)
                break;
            case 'dig':
                actionEntity = new DigAction(action)
                break;
            case 'rob':
                if(!object) throw new Error('No feature')
                actionEntity = new RobAction(action, object)
                break;
            case 'fight':
                if(!object) throw new Error('No feature')
                actionEntity = new FightAction(action, object)
                break;
            case 'look':
                actionEntity = new LookAction(action)
                break;
            case 'talk':
                if(!object) throw new Error('No feature')
                actionEntity = new TalkAction(action, object)
                break;
            case 'pickUp':
                actionEntity = new PickUpAction(action)
                break;
        }
    } catch(_e: any) {
        console.log(`%c Actions Factory eval for raw action ${action}:`, 'color:rgb(182, 86, 158);', _e)
        actionEntity = null
    }
    if(actionEntity === null) throw new Error('Invalid ActionFactory creation: ' + action)
    return actionEntity
}