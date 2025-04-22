import type { IActionResult, IChatMessage, TAction, TActionPayload } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";
import type FeatureEntity from "../zoneEntities/FeatureObjects/FeatureEntity";
import type CellEntity from "../zoneEntities/CellObjects/CellEntity";
import { loadModal } from "@/composables/modal";
import type Unit from "../zoneEntities/Units/Unit";

export default class RobAction extends MapAction {

    public textName: string = 'Ограбить'
    public feature: FeatureEntity | Unit

    constructor(action: TAction, feature: FeatureEntity | Unit){
        super(action)
        this.feature = feature
    }

    async activate(actionPayload: TActionPayload, next: (msg: IChatMessage) => void): Promise<IActionResult>{
        console.log('%c actionPayload: ', 'color:rgb(182, 86, 158);', actionPayload)

        if(!actionPayload.player) {throw new Error('Wrong actionPayload, no player')}
        if(!actionPayload.unit) {throw new Error('Wrong actionPayload, no unit')}

        const chatMessage = this.getChatMessage(actionPayload, actionPayload.clickedCell.cell)

        next(chatMessage)
        return Promise.resolve({
            afterAction: () => {
                loadModal('InspectCard', {
                    unit: actionPayload.unit
                })
            }
        })
    }

    getChatMessage(payload: TActionPayload, cellToRob: CellEntity): IChatMessage {
        if(!cellToRob) return {text: 'Wrong move parameters'}
        const text: string[] = []
        const robUnit = cellToRob.units.find(unit => {
            return unit.actions.find(action => {
                return action.actionName === this.actionName
            })
        })
        if(!robUnit) {
            alert('NOT FOUND ROB UNIT!!!!!!')
            return {text: 'Не найден объект кражи'}
        }
        text.push(`Вы пытаетесь ограбить: ${robUnit.textName}`)
        text.push(`${robUnit.inventory.getItemsForChat()}`)

        return {text: text.join(' ')}
    }

    isActionActive(/*player: IPlayer, cell: CellEntity*/) {
        return true
    }

}