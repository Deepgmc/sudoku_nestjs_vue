import type { TAction, TActionPayload } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";
import type CellEntity from "../zoneEntities/CellObjects/CellEntity";
import type { IChatMessage } from "../Chat";
import type PlayerManager from "../PlayerManager";
import Item, { itemsNeedToDig } from "../items/Items";
import { SLOT_TYPES } from "@/interfaces/ItemsInterfaces";

function roll(): number {
    return parseInt((Math.random() * 100).toFixed(2))
}
function getRandomFrom(start: number, end: number): number {
    return Math.round(Math.random() * end) + start
}

export default class DigAction extends MapAction {

    constructor(action: TAction){
        super(action)
    }

    public textName: string = 'Копать'
    private digChances = [
        {
            name: 'food',
            chancePercent: 30,
            items: ['bug', 'berry', 'acorn']
        },
        {
            name: 'clothes',
            chancePercent: 10,
            items: ['shirt', 'pants']
        },
    ]

    activate(actionPayload: TActionPayload): IChatMessage {
        const chatText: string[] = []

        this.digChances.forEach(digChance => {
            if(roll() <= digChance.chancePercent){
                const thisItem = Item.generateInventoryItem(digChance.items[getRandomFrom(0, 2)], '01')
                if(!thisItem) {
                    return {text: 'Error generating inventory item'}
                }
                actionPayload.player.inventory.addItems([thisItem])
                chatText.push(thisItem.item.textName)
            }
        })

        if(chatText.length > 0){
            return {text: 'Выкопали: ' + chatText.join (' ')}
        } else {
            return {text: 'Не нашлось ничего интересного'}
        }
    }

    getChatMessage(payload: TActionPayload, cellToDig: CellEntity): IChatMessage {
        if(!cellToDig) return {text: 'Wrong move parameters'}
        const text: string[] = []
        return {text: text.join('. ')}
    }

    /** ячейка должна иметь свойство canDig, игрок должен на ней стоять и в инвенторе должна быть лопата */
    isActionActive(player: PlayerManager, cell: CellEntity): boolean {
        return player.standsIn(cell) &&
               cell.canDig &&
               player.isItemEquiped(itemsNeedToDig.SHOVEL, SLOT_TYPES.RHAND)
    }

}