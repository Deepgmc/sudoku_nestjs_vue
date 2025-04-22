import type { AuthManager } from '@/auth/AuthManager';
import type { NetworkManager } from '@/network/NetworkManager';

// import { useAreaStore } from '@/stores/areaStore'
// import { useZoneStore } from '@/stores/zoneStore'
// import { useChatStore } from '@/stores/chatStore'


// export type PiniaStore<T extends (...args: any) => any> = Omit<ReturnType<T>, keyof ReturnType<typeof defineStore>>;

export default class UmbrellaManager {
    public store: unknown

    //public store: PiniaStore<typeof useAreaStore> | PiniaStore<typeof useZoneStore> | PiniaStore<typeof useChatStore>;

    static $authManager: AuthManager;
    static $networkManager: NetworkManager;

    constructor() {

    }

    public authManager: AuthManager = UmbrellaManager.$authManager
    public networkManager: NetworkManager = UmbrellaManager.$networkManager
}