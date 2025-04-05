import type { TAction, TActionPayload } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";
import type CellEntity from "../zoneEntities/CellObjects/CellEntity";
import type { IChatMessage } from "../Chat";
import type { IPlayer } from "@/interfaces/PlayerInterfaces";
import type { IInventoryItem } from "@/interfaces/ItemsInterfaces";

export default class PickUpAction extends MapAction {

    public textName: string = 'Поднять предметы'

    constructor(action: TAction){
        super(action)
    }

    activate(actionPayload: TActionPayload): IChatMessage{
        console.log('%c PickUp actionPayload: ', 'color:rgb(182, 86, 158);', actionPayload)

        if(!actionPayload.clickedCell.cell) throw new Error('Wrong actionPayload, no cell')
        const chatMessage = this.getChatMessage(actionPayload, actionPayload.clickedCell.cell)

        actionPayload.player.inventory.transferItemsFrom(actionPayload.clickedCell.cell.inventory)
        return chatMessage
    }

    getChatMessage(payload: TActionPayload, targetCell: CellEntity): IChatMessage {
        if(!targetCell || targetCell.inventory.isEmpty()) return {text: 'Wrong move parameters'}
        const text: string[] = []


        // .items.forEach((item: IInventoryItem) => {
        //     text.push(`${item.item.textName} (${item.item.icon})`)
        // })
        text.push(`Вы подбираете предметы: ${targetCell.inventory.getItemsForChat()}`)

        return {text: text.join(' ')}
    }

    isActionActive(player: IPlayer, cell: CellEntity) {
        return !cell.inventory.isEmpty()
    }

}