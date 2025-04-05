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



export function ActionsFactory (
    action: TRawAction,
    feature?: FeatureEntity
): MapAction {
    let actionEntity: MapAction | null = null
    try {
        //actionEntity = eval(`new ${capitalizeFirstLetter(action)}Action(action)`)
        switch(action){
            case 'move':
                actionEntity = new MoveAction(action)
                break;
            case 'dig':
                actionEntity = new DigAction(action)
                break;
            case 'rob':
                if(!feature) throw new Error('No feature')
                actionEntity = new RobAction(action, feature)
                break;
            case 'fight':
                if(!feature) throw new Error('No feature')
                actionEntity = new FightAction(action, feature)
                break;
            case 'look':
                actionEntity = new LookAction(action)
                break;
            case 'talk':
                if(!feature) throw new Error('No feature')
                actionEntity = new TalkAction(action, feature)
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