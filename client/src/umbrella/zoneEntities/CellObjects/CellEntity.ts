import type { TRawActions, TCellRawFeatures, IRawFeature, ICellObject, IAction, TRawAction } from '@/interfaces/MapInterfaces.ts';
import type { IInventory, IPlayer } from '@/interfaces/PlayerInterfaces.ts';
import { FeatureFactory } from '../FeatureFactory';
import type FeatureEntity from '../FeatureObjects/FeatureEntity';

export default abstract class CellEntity {
    constructor(
        mapCellObject: ICellObject,
        mapCellFeatures: TCellRawFeatures,
        coords: {x: number, y: number}
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

        this.x = coords.x
        this.y = coords.y

    }
    abstract textName: string
    abstract chatDescription: string
    abstract passability: boolean
    abstract backgroundClass: string

    public generalDefaultActions: TRawAction[] = ['move', 'pickUp', 'look'] as TRawAction[]
    abstract defaultEntityActions: TRawActions
    public actions: IAction[] = [] as IAction[] //собранные с разных источников действия внутри конкретной одной ячейки

    public x: number
    public y: number

    public mapCellObjectName: string
    public orientation: string
    public infoIcons: string[] = []
    public isVisibleToplayer: boolean = false //using player visible range

    public player: IPlayer | null

    public inventory: IInventory = {} as IInventory


    public mapRawFeatures: TCellRawFeatures
    public features: FeatureEntity[] //hydratedFeatures

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