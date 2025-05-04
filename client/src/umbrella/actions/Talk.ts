import type { IChatMessage, TAction, TActionPayload } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";
import type FeatureEntity from "../zoneEntities/FeatureObjects/FeatureEntity";
import type CellEntity from "../zoneEntities/CellObjects/CellEntity";
import Chat from "../ChatManager";
import type Unit from "../zoneEntities/Units/Unit";

export default class TalkAction extends MapAction {

    public textName: string = 'Поговорить'
    public feature: FeatureEntity | Unit

    constructor(action: TAction, feature: FeatureEntity | Unit){
        super(action)
        this.feature = feature
    }

    async activate(): Promise<void>{
        console.log('%c TALK activate:', 'color:rgb(182, 86, 158);', 123)
        return Promise.resolve()
    }

    getChatMessage(payload: TActionPayload, cellToMove: CellEntity): IChatMessage {
        if(!cellToMove) throw new Error('Wrong talk parameters')
        const text: string[] = []
        return Chat.getChatMessage(text.join(' '))
    }

    isActionActive(/*player: PlayerManager, cell: CellEntity*/) {
        return true
    }

}