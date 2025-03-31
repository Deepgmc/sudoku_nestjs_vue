import type { TAction } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";
import type FeatureEntity from "../zoneEntities/FeatureObjects/FeatureEntity";

export default class TalkAction extends MapAction {

    public textName: string = 'Поговорить'
    public feature: FeatureEntity

    constructor(action: TAction, feature: FeatureEntity){
        super(action)
        this.feature = feature
    }

    activate(){
        console.log('%c TALK activate:', 'color:rgb(182, 86, 158);', 123)
    }

}