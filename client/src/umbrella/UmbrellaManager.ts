import type { AuthManager } from '@/auth/AuthManager';
import type NetworkManager from '@/network/NetworkManager';

export default class UmbrellaManager {
    public store: unknown

    static $authManager: AuthManager;
    static $networkManager: NetworkManager;

    constructor() {

    }

    public authManager: AuthManager = UmbrellaManager.$authManager
    public networkManager: NetworkManager = UmbrellaManager.$networkManager
}