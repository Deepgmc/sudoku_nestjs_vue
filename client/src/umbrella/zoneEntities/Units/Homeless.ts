import Unit from "./Unit";
import type { TRawActions } from "@/interfaces/MapInterfaces";
import type { IUnitRaw, TUnitStats } from "@/interfaces/UnitInterfaces";

export class Homeless extends Unit {

    textName: string = 'Бомж'
    public icon = '&#x1F6B6;'
    public defaultEntityActions: TRawActions = []
    public chatDescription = 'На вас смотрит какой-то бомж, грязный, вонючий. Его можно ограбить или поговорить (если он умеет)'


    private defautStats: TUnitStats = {
        level: 1,
        experience: 0,
        currentHealth: 15,
        maxHealth: 15,
        strength: 5,
        agility: 5,
        intellect: 5,
    }

    constructor(unitRaw: IUnitRaw){
        super(true, unitRaw)
        this.initUnit(this.defautStats)
    }

    defaultActions = ['fight', 'talk', 'rob']

    getFeatureInfoIcon(){
        return {icon: this.icon, description: this.textName}
    }
}