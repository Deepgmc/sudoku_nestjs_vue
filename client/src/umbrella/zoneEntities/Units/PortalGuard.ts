import Unit from "./Unit";
import type { TRawActions } from "@/interfaces/MapInterfaces";
import type { IUnitRaw, TUnitStats } from "@/interfaces/Unit";

export class PortalGuard extends Unit {

    textName: string = 'Охранник портала'
    public defaultEntityActions: TRawActions = []
    public chatDescription = 'Прямо по центру дороги стоит довольно высокое человекоподобное существо, одетое в одежду похожую на средневековую кольчугу. В руках ружьё, или автомат. Выглядит оно, в общем, опасно. Но оно стоит на пути к порталу'

    private defautStats: TUnitStats = {
        level: 10,
        experience: 0,
        currentHealth: 100,
        maxHealth: 100,
        strength: 10,
        agility: 10,
        intellect: 10,
    }

    constructor(unitRaw: IUnitRaw){
        super(true, unitRaw)
        this.initUnit(this.defautStats)
    }

    defaultActions = ['fight', 'talk', 'rob']

    getFeatureInfoIcon(){
        return {icon: '&#x1F93A;', description: this.textName}
    }
}