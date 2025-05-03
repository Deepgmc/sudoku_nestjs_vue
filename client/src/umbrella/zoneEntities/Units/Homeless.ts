import Unit from "./Unit";
import type { TCoords, TRawActions } from "@/interfaces/MapInterfaces";
import type { IUnitRaw, TUnitStats } from "@/interfaces/UnitInterfaces";

export class Homeless extends Unit {

    public objectName: string = 'homeless'
    public textName: string = 'Бомж'
    public icon = '&#x1F6B6;'
    public defaultEntityActions: TRawActions = []
    public chatDescription = 'На вас смотрит какой-то бомж, грязный, вонючий. Его можно ограбить или поговорить (если он умеет)'


    private defautStats: TUnitStats = {
        level: 1,
        experience: 0,
        currentHealth: 4,
        maxHealth: 4,
        strength: 5,
        agility: 5,
        intellect: 5,
    }

    constructor(unitRaw: IUnitRaw, coords: TCoords) {
        super(false, unitRaw)
        this.initUnit(this.defautStats, coords)
    }

    defaultActions = ['fight', 'talk', 'rob']

    getFeatureInfoIcon() {
        return {icon: this.icon, description: this.textName}
    }
}