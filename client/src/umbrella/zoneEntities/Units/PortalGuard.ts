import type { IUnitRaw } from "@/interfaces/MapInterfaces";
import Unit from "./Unit";

export class PortalGuard extends Unit {

    textName: string = 'Охранник портала'
    public defaultEntityActions: string[] = []
    public chatDescription = 'Прямо по центру дороги стоит довольно высокое человекоподобное существо, одетое в одежду похожую на средневековую кольчугу. В руках ружьё, или автомат. Выглядит оно, в общем, опасно. Но оно стоит на пути к порталу'

    constructor(unitRaw: IUnitRaw){
        super(unitRaw)
    }

    defaultActions = ['fight', 'talk', 'rob']

    getFeatureInfoIcon(){
        return {icon: '&#x1F93A;', description: this.textName}
    }
}