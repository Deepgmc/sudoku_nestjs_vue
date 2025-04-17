import type { TAction, TActionPayload } from "@/interfaces/MapInterfaces";
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

    activate(actionPayload: TActionPayload, next: (msg: IChatMessage) => void): void{
        console.log('%c PickUp actionPayload: ', 'color:rgb(182, 86, 158);', actionPayload)

        if(!actionPayload.clickedCell.cell) throw new Error('Wrong actionPayload, no cell')

        actionPayload.player.inventory.transferItemsFrom(actionPayload.clickedCell.cell.inventory)
        next(this.getChatMessage(actionPayload, actionPayload.clickedCell.cell))
    }

    getChatMessage(payload: TActionPayload, targetCell: CellEntity): IChatMessage {
        if(!targetCell || targetCell.inventory.isEmpty()) return {text: 'Wrong pickUp parameters'}
        const text: string[] = []
        text.push(`Вы подбираете предметы: ${targetCell.inventory.getItemsForChat()}`)

        return Chat.getChatMessage(text.join(' '))
    }

    isActionActive(player: PlayerManager, cell: CellEntity) {
        return !cell.inventory.isEmpty() &&
            ZoneManager.getInstance().getDistanceBetween(player, cell) === 0
    }

}