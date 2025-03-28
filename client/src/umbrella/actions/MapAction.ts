import type { TAction } from "@/interfaces/MapInterfaces"
import AreaManager from "../AreaManager"
import type ZoneManager from "../ZoneManager"

export default abstract class MapAction {

    public actionName: TAction
    public textName: string = ''
    public areaManager = AreaManager.getInstance()

    constructor(action: TAction){
        this.actionName = action
    }

    abstract activate(zone: ZoneManager): void
}