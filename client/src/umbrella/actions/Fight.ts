import type { IChatMessage, TAction, TActionPayload } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";
import type FeatureEntity from "../zoneEntities/FeatureObjects/FeatureEntity";
import type CellEntity from "../zoneEntities/CellObjects/CellEntity";
import type { IPlayer } from "@/interfaces/PlayerInterfaces";
import Chat from "../ChatManager";

export default class FightAction extends MapAction {

    public textName: string = 'Напасть'
    public feature: FeatureEntity

    constructor(action: TAction, feature: FeatureEntity){
        super(action)
        this.feature = feature
    }

    activate(){
        console.log('%c FIGHT activate:', 'color:rgb(182, 86, 158);', 123)
    }

    getChatMessage(payload: TActionPayload, cellToMove: CellEntity): IChatMessage {
        if(!cellToMove) throw new Error('Wrong fight parameters')
        const text: string[] = []
        return Chat.getChatMessage(text.join(' '))
    }

    isActionActive(player: IPlayer, cell: CellEntity) {
        return true
    }

}