import { useAreaStore as AreaManagerStore } from '@/stores/areaStore'
import { usePlayerStore as PlayerStore } from '@/stores/playerStore'

type TAreaStore = ReturnType<typeof AreaManagerStore>;
type TPlayerStore = ReturnType<typeof PlayerStore>;

export class StoreDecorator {

    public store: TAreaStore | TPlayerStore

    constructor(){
        this.store = eval(`${this.constructor.name}Store()`)
    }
}