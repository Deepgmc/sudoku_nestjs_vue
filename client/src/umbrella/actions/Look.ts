import type { TAction, TActionPayload } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";
import type CellEntity from "../zoneEntities/CellObjects/CellEntity";
import type { IChatMessage } from '@/interfaces/MapInterfaces'
import type { IPlayer } from "@/interfaces/PlayerInterfaces";
import Chat from "../ChatManager";

export default class LookAction extends MapAction {

    public textName: string = 'Осмотреть'

    constructor(action: TAction){
        super(action)
    }

    activate(actionPayload: TActionPayload){
        console.log('%c Look actionPayload: ', 'color:rgb(182, 86, 158);', actionPayload)

        return this.getChatMessage(actionPayload, actionPayload.clickedCell.cell)
    }

    getChatMessage(payload: TActionPayload, targetCell: CellEntity): IChatMessage {
        if(!targetCell) throw new Error('Wrong look parameters')
        const text: string[] = []

        //предметы на земле, фичи, непроходимые объекты дают какойто отклик в чат
        text.push(targetCell.chatDescription)
        targetCell.features.forEach(feature => {
            text.push(feature.chatDescription)
        })
        if(!targetCell.inventory.isEmpty()){
            text.push('На земле вы замечаете что-то интересное')
        }

        return Chat.getChatMessage(text.join('. '))
    }

    isActionActive(player: IPlayer, cell: CellEntity) {
        return true
    }

}