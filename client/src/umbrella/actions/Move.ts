import type { TAction, TActionPayload } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";

export default class MoveAction extends MapAction {

    public textName: string = 'Переместиться'

    constructor(action: TAction){
        super(action)
    }

    activate(actionPayload: TActionPayload){
        //! убрать отсюда clickedCell, ведь перемещение может быть не только к нажатой ячейке
        //! сюда нужно передавать координаты в чистом виде (или ячейку)
        const clickedCell = this.areaManager.store.clickedCell
        if(!clickedCell.x || !clickedCell.y) throw new Error('Wrong cell to move')
        if(!actionPayload.zoneManager) throw new Error('Wrong actionPayload, no zoneManager')
        actionPayload.zoneManager.setAndMovePlayer(clickedCell.x, clickedCell.y)
    }

}