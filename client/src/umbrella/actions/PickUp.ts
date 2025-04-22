import type { IActionResult, TAction, TActionPayload } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";
import type CellEntity from "../zoneEntities/CellObjects/CellEntity";
import type { IChatMessage } from '@/interfaces/MapInterfaces';
import ZoneManager from "../ZoneManager";
import PlayerManager from "../PlayerManager";
import Chat from "../ChatManager";

export default class PickUpAction extends MapAction {

    public textName: string = 'Поднять предметы'

    constructor(action: TAction){
        super(action)
    }

    async activate(actionPayload: TActionPayload, next: (msg: IChatMessage) => void): Promise<IActionResult>{
        console.log('%c PickUp actionPayload: ', 'color:rgb(182, 86, 158);', actionPayload)

        if(!actionPayload.clickedCell.cell) throw new Error('Wrong actionPayload, no cell')

        next(this.getChatMessage(actionPayload))
        actionPayload.player.inventory.transferItemsFrom(actionPayload.clickedCell.cell.inventory)
        return Promise.resolve({
            afterAction: () => {

            }
        })
    }

    getChatMessage(payload: TActionPayload): IChatMessage {
        if(!payload.clickedCell.cell || payload.clickedCell.cell.inventory.isEmpty()) {
            return {text: 'Wrong pickUp parameters'}
        }
        const text: string[] = []
        text.push(`Вы подбираете предметы: ${payload.clickedCell.cell.inventory.getItemsForChat()}`)

        return Chat.getChatMessage(text.join(' '))
    }

    isActionActive(player: PlayerManager, cell: CellEntity) {
        return !cell.inventory.isEmpty() &&
            ZoneManager.getInstance().getDistanceBetween(player, cell) === 0
    }

}