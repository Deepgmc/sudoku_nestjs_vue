import type { TAction, TActionPayload } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";
import type CellEntity from "../zoneEntities/CellObjects/CellEntity";
import type { IChatMessage } from '@/interfaces/MapInterfaces';
import type PlayerManager from "../PlayerManager";
import { SLOT_TYPES } from "@/interfaces/ItemsInterfaces";
import Item from "../items/Items";
import Chat from "../ChatManager";

//предметы, необходимые для копания:
export const enum itemsNeedToDig {SHOVEL = 'shovel'}

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
            chancePercent: 100, //30
            items: ['bug', 'berry', 'acorn']
        },
        {
            name: 'clothes',
            chancePercent: 100, //10
            items: ['shirt', 'pants']
        },
    ]

    async activate(actionPayload: TActionPayload, next: (msg: IChatMessage) => void): Promise<void> {
        const chatText: string[] = []

        this.digChances.forEach(digChance => {
            if(roll() <= digChance.chancePercent){
                const thisItem = Item.generateInventoryItem(digChance.items[getRandomFrom(0, 1)], '01')
                if(!thisItem) {
                    return {text: 'Error generating inventory item'}
                }
                actionPayload.player.inventory.addItems([thisItem])
                chatText.push(thisItem.item.textName)
            }
        })

        if(chatText.length > 0){
            next(Chat.getChatMessage('Выкопали: ' + chatText.join (' ')))
        } else {
            next(Chat.getChatMessage('Не нашлось ничего интересного'))
        }
        return Promise.resolve()
    }

    getChatMessage(payload: TActionPayload, cellToDig: CellEntity): IChatMessage {
        if(!cellToDig) return {text: 'Wrong move parameters'}
        const text: string[] = []
        return Chat.getChatMessage(text.join(' '))
    }

    /** ячейка должна иметь свойство canDig, игрок должен на ней стоять и в инвенторе должна быть лопата */
    isActionActive(player: PlayerManager, cell: CellEntity): boolean {
        return player.standsIn(cell) &&
               cell.canDig &&
               player.isItemEquiped(itemsNeedToDig.SHOVEL, SLOT_TYPES.RHAND)
    }

}