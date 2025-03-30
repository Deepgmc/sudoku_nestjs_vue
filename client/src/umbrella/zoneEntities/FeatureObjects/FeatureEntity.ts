import type { IInventoryItem } from "@/interfaces/ItemsInterfaces";
import type { IAction, IRawFeature, TRawAction, TRawActions } from "@/interfaces/MapInterfaces";

export default abstract class FeatureEntity {

    public objectName: string = ''
    abstract textName: string
    abstract isUnit: boolean

    public items: IInventoryItem[] = []

    constructor(featureRaw: IRawFeature){
        this.objectName = featureRaw.name
        this.mapFeatureActions = featureRaw.actions
    }

    public mapFeatureActions: TRawActions
    public generalDefaultActions: TRawAction[] = ['look'] as TRawAction[]
    abstract defaultEntityActions: TRawActions

    public actions: IAction[] = [] as IAction[] //собранные с разных источников действия для этого конкретного feature


    abstract getFeatureInfoIcon(): string
}