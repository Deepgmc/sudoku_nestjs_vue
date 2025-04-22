import type { IChatMessage, TAction, TActionPayload } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";
import type FeatureEntity from "../zoneEntities/FeatureObjects/FeatureEntity";
import type CellEntity from "../zoneEntities/CellObjects/CellEntity";
import type { IPlayer } from "@/interfaces/PlayerInterfaces";
import Chat from "../ChatManager";
import type Unit from "../zoneEntities/Units/Unit";

export default class FightAction extends MapAction {

    public textName: string = 'Напасть'
    public feature: FeatureEntity | Unit

    constructor(action: TAction, feature: FeatureEntity | Unit){
        super(action)
        this.feature = feature
    }

    async activate(): Promise<void>{
        console.log('%c FIGHT activate:', 'color:rgb(182, 86, 158);', 123)
        return Promise.resolve()
    }

    getChatMessage(payload: TActionPayload, cellToMove: CellEntity): IChatMessage {
        if(!cellToMove) throw new Error('Wrong fight parameters')
        const text: string[] = []
        return Chat.getChatMessage(text.join(' '))
    }

    isActionActive(/*player: IPlayer, cell: CellEntity*/) {
        return true
    }

}