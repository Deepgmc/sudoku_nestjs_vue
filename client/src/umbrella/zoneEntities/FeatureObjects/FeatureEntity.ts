import type { IAction, IRawFeature, TRawAction, TRawActions } from "@/interfaces/MapInterfaces";

export default abstract class FeatureEntity {

    public objectName: string = ''
    abstract textName: string

    constructor(featureRaw: IRawFeature){
        this.objectName = featureRaw.name
    }

    public generalDefaultActions: TRawAction[] = ['move'] as TRawAction[]
    abstract defaultEntityActions: TRawActions
    abstract mapFeatureActions: TRawActions
    public actions: IAction[] = [] as IAction[] //собранные с разных источников действия для этого конкретного feature


    abstract getFeatureInfoIcon(): string
}