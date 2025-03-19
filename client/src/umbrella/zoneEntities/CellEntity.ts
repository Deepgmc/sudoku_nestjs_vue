import type { TCellObjOptions, TCellActions, TCellFeatures } from '@/interfaces/MapInterfaces.ts';
import {entitiesOptions, type TObjectNames } from './zoneEntities.ts'
import PlayerManager from '../PlayerManager.ts';

export default abstract class CellEntity {
    constructor(
        objectName: TObjectNames,
        mapOptions: any,
        mapCellFeatures: TCellFeatures
    ){
        this.objectName = objectName
        this.player = null
        const objKey: TObjectNames = this.objectName
        if(mapOptions.orientation) this.orientation = mapOptions.orientation; else this.orientation = '' //some cells do not need orientation
        this.features = mapCellFeatures

        this.passability = entitiesOptions[objKey].passability
        this.backgroundClass = entitiesOptions[objKey].backgroundClass
        this.actions = entitiesOptions[objKey].actions//.concat(mapOptions.actions)
        this.textName = entitiesOptions[objKey].textName

        this.features.forEach(f => {
            this.infoIcons.push(this.getFeatureInfoIcon(f))
        })
    }
    public objectName: TObjectNames
    public player: PlayerManager | null
    public orientation: string
    public passability: boolean
    public backgroundClass: string
    public actions: TCellActions
    public textName: string
    public infoIcons: string[] = []
    public features: TCellFeatures

    abstract generateInfoIcons(): void

    abstract getInfoDescription(): string

    abstract getFeaturesInfo(): string

    getFeatureInfoIcon(type: string){
        let icon = ''
        switch (type) {
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

    getFeatureText(feature: string){
        let fText = ''
        switch (feature) {
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