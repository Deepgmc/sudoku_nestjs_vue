import type { AuthManager } from '@/auth/AuthManager';
import type { NetworkManager } from '@/network/NetworkManager';
import { defineStore } from 'pinia'

import { useAreaStore } from '@/stores/areaStore'
import { usePlayerStore } from '@/stores/playerStore'
import { useZoneStore } from '@/stores/zoneStore'
import { useChatStore } from '@/stores/chatStore'

type TAreaStore = ReturnType<typeof useAreaStore>;
type TPlayerStore = ReturnType<typeof usePlayerStore>;
type TZoneStore = ReturnType<typeof useZoneStore>;
type TChatStore = ReturnType<typeof useChatStore>;

// export type PiniaStore<T extends (...args: any) => any> = Omit<ReturnType<T>, keyof ReturnType<typeof defineStore>>;

export default class UmbrellaManager {

    // public store: TAreaStore | TPlayerStore | TZoneStore | TChatStore
    public store: unknown

    // public areaStore: TAreaStore | undefined
    // public playerStore: TPlayerStore | undefined
    // public zoneStore: TZoneStore | undefined
    // public chatStore: TChatStore | undefined
    //public store: PiniaStore<typeof useAreaStore> | PiniaStore<typeof usePlayerStore> | PiniaStore<typeof useZoneStore> | PiniaStore<typeof useChatStore>;

    static $authManager: AuthManager;
    static $networkManager: NetworkManager;

    constructor() {

    }

    public authManager: AuthManager = UmbrellaManager.$authManager
    public networkManager: NetworkManager = UmbrellaManager.$networkManager
}