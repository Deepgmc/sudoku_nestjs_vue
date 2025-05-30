import type { IChatMessage, TAction, TActionPayload, TClickedCell } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";
import type CellEntity from "../zoneEntities/CellObjects/CellEntity";
import Chat from "../ChatManager";
import AreaManager from "../AreaManager";
import type PlayerManager from "@/umbrella/PlayerManager";

export default class MoveAction extends MapAction {

    public textName: string = 'Переместиться'

    constructor(action: TAction){
        super(action)
    }

    async activate(actionPayload: TActionPayload, next: (msg: IChatMessage) => void): Promise<void> {
        //! убрать отсюда clickedCell, ведь перемещение может быть не только к нажатой ячейке
        //! сюда нужно передавать координаты в чистом виде (или ячейку)
        const clickedCell: TClickedCell = AreaManager.getInstance().store.getClickedCell()

        if(!clickedCell.x || !clickedCell.y) {throw new Error('Wrong cell to move')}
        if(!actionPayload.zoneManager) {throw new Error('Wrong actionPayload, no zoneManager')}
        next(this.getChatMessage(actionPayload, clickedCell.cell))
        await actionPayload.zoneManager.setAndMovePlayer({x: clickedCell.x, y: clickedCell.y})
    }

    getChatMessage(payload: TActionPayload, cellToMove: CellEntity): IChatMessage {
        if(!cellToMove) throw new Error('Wrong move parameters')
        const text: string[] = []

        //move direction
        text.push(`Вы идёте на ${this.getDirection(payload.player.x, payload.player.y, cellToMove.x, cellToMove.y)}`)

        //items on ground
        if ( !cellToMove.inventory.isEmpty() ){
            text.push('Под ногами вы замечаете что-то интересное')
        }

        return Chat.getChatMessage(text.join(' '))
    }

    /**
     *
     * @param player Is move button active
     * @param cell
     * @returns
     */
    isActionActive(player: PlayerManager, cell: CellEntity) {
        return cell.isMovable() && player.canMoveToCell(cell)
    }

    /** в какую сторону перемещаемся (просто текст) */
    getDirection(fromX: number, fromY: number, toX: number, toY: number): string{
        let text = ''
        if(fromX < toX){
            text = 'восток'
        } else if(fromX > toX) {
            text = 'запад'
        } else if(fromY < toY) {
            text = 'юг'
        } else text = 'север'
        return text
    }

}