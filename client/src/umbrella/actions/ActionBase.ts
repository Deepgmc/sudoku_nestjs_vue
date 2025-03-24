import type { TAction } from "@/interfaces/MapInterfaces"

export default class ActionBase {
    public actionName: TAction
    constructor(action: TAction){
        this.actionName = action
    }
}