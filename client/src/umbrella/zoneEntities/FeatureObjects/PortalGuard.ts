import type { IRawFeature } from "@/interfaces/MapInterfaces";
import FeatureEntity from "./FeatureEntity";

export class PortalGuard extends FeatureEntity {

    textName: string = 'Охранник портала'
    public defaultEntityActions: string[] = []
    public isUnit = true
    public chatDescription = 'Прямо по центру дороги стоит довольно высокое человекоподобное существо, одетое в одежду похожую на средневековую кольчугу. В руках ружьё, или автомат. Выглядит оно, в общем, опасно. Но оно стоит на пути к порталу'

    constructor(featureRaw: IRawFeature){
        super(featureRaw)
    }

    defaultActions = ['fight', 'talk', 'rob']

    getFeatureInfoIcon(){
        return {icon: '&#x1F93A;', description: this.textName}
    }
}