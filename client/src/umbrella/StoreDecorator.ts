import { useAreaStore as AreaManagerStore } from '@/stores/areaStore'
import { usePlayerStore as PlayerStore } from '@/stores/playerStore'

type TAreaStore = ReturnType<typeof AreaManagerStore>;
type TPlayerStore = ReturnType<typeof PlayerStore>;

export class StoreDecorator {

    public store: any//TAreaStore | TPlayerStore

    constructor(){
        //console.log('%c Creating store:', 'color:rgb(182, 86, 158);', `${this.constructor.name}Store()`)
        this.store = eval(`${this.constructor.name}Store()`)
    }
}