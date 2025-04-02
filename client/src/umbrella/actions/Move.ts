import type { TAction, TActionPayload } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";
import type { IChatMessage } from "../Chat";
import type CellEntity from "../zoneEntities/CellObjects/CellEntity";

export default class MoveAction extends MapAction {

    public textName: string = 'Переместиться'

    constructor(action: TAction){
        super(action)
    }

    activate(actionPayload: TActionPayload): IChatMessage{
        //! убрать отсюда clickedCell, ведь перемещение может быть не только к нажатой ячейке
        //! сюда нужно передавать координаты в чистом виде (или ячейку)
        const clickedCell = this.areaManager.store.clickedCell

        if(!clickedCell.x || !clickedCell.y) {throw new Error('Wrong cell to move')}
        if(!actionPayload.zoneManager) {throw new Error('Wrong actionPayload, no zoneManager')}

        const chatMessage = this.getChatMessage(actionPayload, clickedCell.cell)

        actionPayload.zoneManager.setAndMovePlayer(clickedCell.x, clickedCell.y)
        return chatMessage
    }

    getChatMessage(payload: TActionPayload, cellToMove: CellEntity): IChatMessage {
        if(!cellToMove) return {text: 'Wrong move parameters'}
        const text: string[] = []

        //move direction
        text.push(`Вы идёте на ${this.getDirection(payload.player.x, payload.player.y, cellToMove.x, cellToMove.y)}`)

        //items on ground
        if ( !cellToMove.inventory.isEmpty() ){
            text.push('Под ногами вы замечаете что-то интересное')
        }

        return {text: text.join('. ')}
    }

    /** в какую сторону перемещаемся (просто текст) */
    getDirection(fromX: number, fromY: number, toX: number, toY: number): string{
        let text = ''
        if(fromX < toX) text = 'восток'
        else if(fromX > toX) text = 'запад'
        else if(fromY < toY) text = 'юг'
        else text = 'север'
        return text
    }

}