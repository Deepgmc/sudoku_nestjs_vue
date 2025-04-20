import type { IActionResult, IChatMessage, TAction, TActionPayload } from "@/interfaces/MapInterfaces"
import AreaManager from "../AreaManager"
import type CellEntity from "../zoneEntities/CellObjects/CellEntity"
import type PlayerManager from "../PlayerManager"

export default abstract class MapAction {

    public actionName: TAction
    public textName: string = ''
    public areaManager: AreaManager = AreaManager.getInstance()

    constructor(action: TAction){
        this.actionName = action
    }

    abstract activate(
        actionPayload: TActionPayload,
        next: (msg: any) => void //action callback, полученный извне
    ): IActionResult //action callback, заданный самим действием

    abstract getChatMessage(actionPayload: TActionPayload, cell?: CellEntity): IChatMessage

    abstract isActionActive(player: PlayerManager, cell: CellEntity): boolean

    isRobAction(){
        return this.actionName === 'rob'
    }
}