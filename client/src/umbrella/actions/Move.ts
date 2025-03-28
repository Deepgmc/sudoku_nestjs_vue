import type { TAction } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";
import type ZoneManager from "../ZoneManager";

export default class MoveAction extends MapAction {

    public textName: string = 'Переместиться'

    constructor(action: TAction){
        super(action)
    }

    activate(zone: ZoneManager){
        const clickedCell = this.areaManager.store.clickedCell
        if(!clickedCell.x || !clickedCell.y) throw new Error('Wrong cell to move')
        zone.setAndMovePlayer(clickedCell.x, clickedCell.y)
    }

}