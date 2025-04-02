import type { TAction, TActionPayload } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";
import type FeatureEntity from "../zoneEntities/FeatureObjects/FeatureEntity";
import type CellEntity from "../zoneEntities/CellObjects/CellEntity";
import type { IChatMessage } from "../Chat";
import type { IPlayer } from "@/interfaces/PlayerInterfaces";

export default class TalkAction extends MapAction {

    public textName: string = 'Поговорить'
    public feature: FeatureEntity

    constructor(action: TAction, feature: FeatureEntity){
        super(action)
        this.feature = feature
    }

    activate(){
        console.log('%c TALK activate:', 'color:rgb(182, 86, 158);', 123)
    }

    getChatMessage(payload: TActionPayload, cellToMove: CellEntity): IChatMessage {
        if(!cellToMove) return {text: 'Wrong move parameters'}
        const text: string[] = []
        return {text: text.join('. ')}
    }

    isActionActive(player: IPlayer, cell: CellEntity) {
        return true
    }

}