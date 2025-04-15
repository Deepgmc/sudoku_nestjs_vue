import type { IInventory } from "@/interfaces/ItemsInterfaces";
import type { IAction, infoIconsObject, IRawFeature, TRawAction, TRawActions } from "@/interfaces/MapInterfaces";

export default abstract class FeatureEntity {

    public objectName: string = ''
    abstract textName: string
    abstract isUnit: boolean
    abstract chatDescription: string

    public inventory: IInventory = {} as IInventory

    constructor(featureRaw: IRawFeature){
        this.objectName = featureRaw.name
        this.mapFeatureActions = featureRaw.actions
    }

    abstract defaultActions: TRawActions
    public mapFeatureActions: TRawActions
    public generalDefaultActions: TRawAction[] = [] as TRawAction[]
    abstract defaultEntityActions: TRawActions

    public actions: IAction[] = [] as IAction[] //собранные с разных источников действия для этого конкретного feature


    abstract getFeatureInfoIcon(): infoIconsObject
}