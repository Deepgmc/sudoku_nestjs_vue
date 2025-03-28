import type MapAction from './MapAction.ts'
import type { TRawAction } from '@/interfaces/MapInterfaces.ts'
import RobAction from './Rob.ts'
import MoveAction from './Move.ts'
import FightAction from './Fight.ts'
import TalkAction from './Talk.ts'
import DigAction from './Dig.ts'
import LookAction from './Look.ts'
import LookWindowAction from './LookWindow.ts'
import AskAboutHomeAction from './AskAboutHome.ts'


export function ActionsFactory (
    action: TRawAction
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
                actionEntity = new RobAction(action)
                break;
            case 'fight':
                actionEntity = new FightAction(action)
                break;
            case 'look':
                actionEntity = new LookAction(action)
                break;
            case 'talk':
                actionEntity = new TalkAction(action)
                break;
            case 'lookWindow':
                actionEntity = new LookWindowAction(action)
                break;
            case 'askAboutHome':
                actionEntity = new AskAboutHomeAction(action)
                break;
        }
    } catch(_e: any) {
        console.log(`%c Actions Factory eval for raw action ${action}:`, 'color:rgb(182, 86, 158);', _e)
        actionEntity = null
    }
    if(actionEntity === null) throw new Error('Invalid ActionFactory creation: ' + action)
    return actionEntity
}

function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}