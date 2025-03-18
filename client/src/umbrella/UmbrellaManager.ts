import type { AuthManager } from '@/auth/AuthManager';
import type { NetworkManager } from '@/network/NetworkManager';
import { useAreaStore as AreaManagerStore } from '@/stores/areaStore'
import { usePlayerStore as PlayerManagerStore } from '@/stores/playerStore'
import { useZoneStore as ZoneManagerStore } from '@/stores/zoneStore'

type TAreaStore = ReturnType<typeof AreaManagerStore>;
type TPlayerStore = ReturnType<typeof PlayerManagerStore>;
type TZoneStore = ReturnType<typeof ZoneManagerStore>;

export default class UmbrellaManager {

    public store: any//TAreaStore | TPlayerStore | TZoneStore

    static $authManager: AuthManager;
    static $networkManager: NetworkManager;

    constructor(){
        //console.log('%c Creating store:', 'color:rgb(182, 86, 158);', `${this.constructor.name}Store()`)
        this.store = eval(`${this.constructor.name}Store()`)
    }

    public authManager: AuthManager = UmbrellaManager.$authManager
    public networkManager: NetworkManager = UmbrellaManager.$networkManager
}