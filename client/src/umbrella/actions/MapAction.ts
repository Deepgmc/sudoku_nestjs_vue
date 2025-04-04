import type { TAction, TActionPayload } from "@/interfaces/MapInterfaces"
import AreaManager from "../AreaManager"
import type { IChatMessage } from "../Chat"
import type CellEntity from "../zoneEntities/CellObjects/CellEntity"
import type PlayerManager from "../PlayerManager"

export default abstract class MapAction {

    public actionName: TAction
    public textName: string = ''
    public areaManager: AreaManager = AreaManager.getInstance()

    constructor(action: TAction){
        this.actionName = action
    }

    abstract activate(actionPayload: TActionPayload): void

    abstract getChatMessage(actionPayload: TActionPayload, cell?: CellEntity): IChatMessage

    abstract isActionActive(player: PlayerManager, cell: CellEntity): boolean
}