import type { TAction, TActionPayload } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";

export default class PickUpAction extends MapAction {

    public textName: string = 'Поднять предметы'

    constructor(action: TAction){
        super(action)
    }

    activate(actionPayload: TActionPayload){
        console.log('%c PickUp actionPayload: ', 'color:rgb(182, 86, 158);', actionPayload)

        if(!actionPayload.clickedCell.cell) throw new Error('Wrong actionPayload, no cell')

        actionPayload.player.inventory.transferItemsFrom(actionPayload.clickedCell.cell.inventory)
    }

}