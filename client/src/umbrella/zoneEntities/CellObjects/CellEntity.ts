import type { TRawActions, TCellRawFeatures, IRawFeature, ICellObject, IAction, IFeature, TRawAction } from '@/interfaces/MapInterfaces.ts';
import type { IPlayer } from '@/interfaces/playerInterfaces.ts';
import { FeatureFactory } from '../FeatureFactory';

export default abstract class CellEntity {
    constructor(
        mapCellObject: ICellObject,
        mapCellFeatures: TCellRawFeatures
    ){
        this.mapCellObjectName = mapCellObject.name

        this.player = null

        if(mapCellObject.orientation) this.orientation = mapCellObject.orientation; else this.orientation = '' //some cells do not need orientation
        this.mapRawFeatures = mapCellFeatures
        this.features = this.mapRawFeatures.map((featureRaw: IRawFeature) => {
            return FeatureFactory(featureRaw)
        })

        this.features.forEach(feature => {
            this.infoIcons.push(feature.getFeatureInfoIcon())
        })

    }
    abstract textName: string
    abstract passability: boolean
    abstract backgroundClass: string

    public generalDefaultActions: TRawAction[] = ['move', 'look'] as TRawAction[]
    abstract defaultEntityActions: TRawActions
    public actions: IAction[] = [] as IAction[] //собранные с разных источников действия внутри конкретной одной ячейки

    public mapCellObjectName: string
    public orientation: string
    public infoIcons: string[] = []
    public isVisibleToplayer: boolean = false //using player visible range

    public player: IPlayer | null


    public mapRawFeatures: TCellRawFeatures
    public features: IFeature[] //hydratedFeatures

    abstract generateInfoIcons(): void
    abstract getInfoDescription(): string

    //abstract getFeaturesInfo(): string

    /**
     * whether player can move through cell or not
     * @returns yes or not
     */
    isMovable(): boolean {
        return this.passability
    }
}