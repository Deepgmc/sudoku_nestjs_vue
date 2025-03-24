import type ActionBase from './ActionBase.ts'
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
): ActionBase {
    let actionEntity: ActionBase | null = null
    try {
        actionEntity = eval(`new ${capitalizeFirstLetter(action)}Action(action)`)
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