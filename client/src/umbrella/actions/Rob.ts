import type { TAction, TActionPayload } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";
import type FeatureEntity from "../zoneEntities/FeatureObjects/FeatureEntity";
import type CellEntity from "../zoneEntities/CellObjects/CellEntity";
import type { IChatMessage } from "../Chat";
import type { IPlayer } from "@/interfaces/PlayerInterfaces";

export default class RobAction extends MapAction {

    public textName: string = 'Ограбить'
    public feature: FeatureEntity

    constructor(action: TAction, feature: FeatureEntity){
        super(action)
        this.feature = feature
    }

    activate(actionPayload: TActionPayload){
        console.log('%c ROB activate (this.feature): ', 'color:rgb(182, 86, 158);', this.feature)
        console.log('%c actionPayload: ', 'color:rgb(182, 86, 158);', actionPayload)

        if(!actionPayload.player) throw new Error('Wrong actionPayload, no player')
        if(!actionPayload.feature) throw new Error('Wrong actionPayload, no feature')

        actionPayload.player.inventory.transferItemsFrom(actionPayload.feature.inventory)
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