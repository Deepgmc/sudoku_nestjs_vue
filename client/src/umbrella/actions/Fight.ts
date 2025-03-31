import type { TAction } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";
import type FeatureEntity from "../zoneEntities/FeatureObjects/FeatureEntity";

export default class FightAction extends MapAction {

    public textName: string = 'Напасть'
    public feature: FeatureEntity

    constructor(action: TAction, feature: FeatureEntity){
        super(action)
        this.feature = feature
    }

    activate(){
        console.log('%c FIGHT activate:', 'color:rgb(182, 86, 158);', 123)
    }

}