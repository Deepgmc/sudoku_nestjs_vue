import Unit from "./Unit";
import type { TCoords, TRawActions } from "@/interfaces/MapInterfaces";
import type { IUnitRaw, TUnitStats } from "@/interfaces/UnitInterfaces";

export class PortalGuard extends Unit {

    objectName: string = 'portalGuard'
    textName: string = 'Охранник портала'
    public icon = '&#x1F93A;'
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

    constructor(unitRaw: IUnitRaw, coords: TCoords){
        super(false, unitRaw)
        this.initUnit(this.defautStats, coords)
    }

    defaultActions = ['fight', 'talk', 'rob']
}