import type { IChatMessage, TAction, TActionPayload } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";
import type FeatureEntity from "../zoneEntities/FeatureObjects/FeatureEntity";
import type CellEntity from "../zoneEntities/CellObjects/CellEntity";
import type { IPlayer } from "@/interfaces/PlayerInterfaces";

export default class RobAction extends MapAction {

    public textName: string = 'Ограбить'
    public feature: FeatureEntity

    constructor(action: TAction, feature: FeatureEntity){
        super(action)
        this.feature = feature
    }

    activate(actionPayload: TActionPayload, next: (msg: IChatMessage) => void){
        console.log('%c ROB activate (this.feature): ', 'color:rgb(182, 86, 158);', this.feature)
        console.log('%c actionPayload: ', 'color:rgb(182, 86, 158);', actionPayload)

        if(!actionPayload.player) {throw new Error('Wrong actionPayload, no player')}
        if(!actionPayload.feature) {throw new Error('Wrong actionPayload, no feature')}

        const chatMessage = this.getChatMessage(actionPayload, actionPayload.clickedCell.cell)

        //actionPayload.player.inventory.transferItemsFrom(actionPayload.feature.inventory)

        next(chatMessage)
    }

    getChatMessage(payload: TActionPayload, cellToRob: CellEntity): IChatMessage {
        if(!cellToRob) return {text: 'Wrong move parameters'}
        const text: string[] = []
        const robFeature = cellToRob.features.find(feature => {
            return feature.actions.find(action => {
                return action.actionName === this.actionName
            })
        })
        if(!robFeature) {
            return {text: 'Не найден объект кражи'}
        }
        text.push(`Вы пытаетесь ограбить: ${robFeature.textName}`)
        text.push(`${robFeature.inventory.getItemsForChat()}`)

        return {text: text.join(' ')}
    }

    isActionActive(/*player: IPlayer, cell: CellEntity*/) {
        return true
    }

}