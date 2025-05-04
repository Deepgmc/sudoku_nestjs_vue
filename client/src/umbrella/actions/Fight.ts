import type { IActionResult, IChatMessage, TAction, TActionPayload } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";
import type FeatureEntity from "../zoneEntities/FeatureObjects/FeatureEntity";
import type CellEntity from "../zoneEntities/CellObjects/CellEntity";
import Chat from "../ChatManager";
import type Unit from "../zoneEntities/Units/Unit";
import { loadModal } from "@/composables/modal";
import type PlayerManager from "@/umbrella/PlayerManager";

export default class FightAction extends MapAction {

    public textName: string = 'Напасть'
    public feature: FeatureEntity | Unit

    constructor(action: TAction, feature: FeatureEntity | Unit) {
        super(action)
        this.feature = feature
    }

    async activate(actionPayload: TActionPayload, next: (msg: IChatMessage) => void): Promise<IActionResult> {
        console.log('%c FightAction playload:', 'color:rgb(182, 86, 158);', actionPayload)

        next(this.getChatMessage(actionPayload, actionPayload.clickedCell.cell))

        return Promise.resolve({
            afterAction: () => {
                loadModal('Fight', {
                    unit: actionPayload.unit
                })
            }
        })
    }

    getChatMessage(payload: TActionPayload, cellToMove: CellEntity): IChatMessage {
        if(!cellToMove) throw new Error('Wrong fight parameters')
        const text: string[] = []
        if(payload.unit){
            text.push(`Вы напали на ${payload.unit?.textName}`)
        } else {
            throw new Error(`Неверный юнит для нападения`)
        }
        return Chat.getChatMessage(text.join(' '))
    }

    isActionActive(player: PlayerManager, cell: CellEntity) {
        return player.standsIn(cell)
    }

}