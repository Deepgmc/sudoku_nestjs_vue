import { FeatureFactory } from '../FeatureFactory';

import type { TRawActions, TCellRawFeatures, IRawFeature, ICellObject, TRawAction, infoIconsObject, TCellRawUnits, IUnitRaw } from '@/interfaces/MapInterfaces.ts';
import type FeatureEntity from '../FeatureObjects/FeatureEntity';
import type { IInventory } from '@/interfaces/ItemsInterfaces';
import type MapAction from '@/umbrella/actions/MapAction';
import type Unit from '../Units/Unit';
import { UnitFactory } from '../Units/UnitFactory';

export default abstract class CellEntity {
    constructor(
        mapCellObject: ICellObject,
        mapCellFeatures: TCellRawFeatures,
        mapCellUnits: TCellRawUnits,
        coords: {x: number, y: number}
    ){
        this.mapCellObjectName = mapCellObject.name

        this.player = false

        if(mapCellObject.orientation) this.orientation = mapCellObject.orientation; else this.orientation = '' //some cells do not need orientation
        this.features = mapCellFeatures.map((featureRaw: IRawFeature) => {
            return FeatureFactory(featureRaw)
        })
        this.units = mapCellUnits.map((unitRaw: IUnitRaw) => {
            return UnitFactory(unitRaw)
        })

        this.features.forEach(feature => {
            this.infoIcons.push(feature.getFeatureInfoIcon())
        })
        this.units.forEach(unit => {
            this.infoIcons.push(unit.getFeatureInfoIcon())
        })

        this.x = coords.x
        this.y = coords.y

    }
    abstract textName: string
    abstract chatDescription: string
    abstract passability: boolean
    abstract canDig: boolean
    abstract backgroundClass: string

    abstract defaultEntityActions: TRawActions
    public generalDefaultActions: TRawAction[] = ['move', 'pickUp', 'look'] as TRawAction[]
    public actions: MapAction[] = [] as MapAction[] //собранные с разных источников действия внутри конкретной одной ячейки

    public x: number
    public y: number

    public mapCellObjectName: string
    public orientation: string
    public infoIcons: infoIconsObject[] = []
    public isVisibleToplayer: boolean = false //using player visible range

    public player: boolean

    public inventory: IInventory = {} as IInventory //инвентарь ячейки, предметы валяющиеся

    public features: FeatureEntity[] //hydratedFeatures
    public units: Unit[] //hydratedUnits

    abstract generateInfoIcons(): void
    abstract getInfoDescription(): string

    /**
     * whether player can move through cell or not
     * @returns yes or not
     */
    isMovable(): boolean {
        return this.passability
    }
}