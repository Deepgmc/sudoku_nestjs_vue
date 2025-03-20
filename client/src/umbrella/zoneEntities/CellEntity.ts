import type { TCellActions, TCellFeatures, IFeature, ICellObject } from '@/interfaces/MapInterfaces.ts';
import PlayerManager from '../PlayerManager.ts';

export default abstract class CellEntity {
    constructor(
        mapCellObject: ICellObject,
        mapCellFeatures: TCellFeatures
    ){
        this.mapCellObjectName = mapCellObject.name

        this.player = null

        if(mapCellObject.orientation) this.orientation = mapCellObject.orientation; else this.orientation = '' //some cells do not need orientation
        this.mapRawFeatures = mapCellFeatures

        this.mapRawFeatures.forEach(feature => {
            this.infoIcons.push(this.getFeatureInfoIcon(feature))
        })
    }
    abstract passability: boolean
    abstract backgroundClass: string
    abstract actions: TCellActions
    abstract textName: string

    public mapCellObjectName: string
    public orientation: string
    public infoIcons: string[] = []

    //?FEATURES
    public player: PlayerManager | null
    public mapRawFeatures: TCellFeatures

    abstract generateInfoIcons(): void

    abstract getInfoDescription(): string

    abstract getFeaturesInfo(): string

    getFeatureInfoIcon(feature: IFeature){
        let icon = ''
        switch (feature.name) {
            case 'portal':
                icon = '&#x25CE;'
                break;
            case 'homeless':
                icon = '&#x1F6B6;'
                break;
            case 'portalGuard':
                icon = '&#x1F93A;'
                break;
            default:
                break;
        }
        return icon
    }

    getFeatureText(feature: IFeature){
        let fText = ''
        switch (feature.name) {
            case 'portal':
                fText = 'Портал в другую зону'
                break;
            case 'homeless':
                fText = 'Какой-то БОМЖ'
                break;
            case 'portalGuard':
                fText = 'Защитник'
                break;
            case 'houseEntrance':
            console.log('%c asdasdasd:', 'color:rgb(182, 86, 158);', )
                fText = 'Вход в здание'
                break;
            default:
                break;
        }
        return fText
    }
}

export function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}