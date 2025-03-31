import type { TAction, TActionPayload } from "@/interfaces/MapInterfaces"
import AreaManager from "../AreaManager"

export default abstract class MapAction {

    public actionName: TAction
    public textName: string = ''
    public areaManager: AreaManager = AreaManager.getInstance()

    constructor(action: TAction){
        this.actionName = action
    }

    abstract activate(actionPayload: TActionPayload): void
}