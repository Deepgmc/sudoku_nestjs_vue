import type { IUnitRaw, TRawActions } from "@/interfaces/MapInterfaces";
import Unit from "./Unit";

export class Homeless extends Unit {

    textName: string = 'Бомж'
    public defaultEntityActions: TRawActions = []
    public chatDescription = 'На вас смотрит какой-то бомж, грязный, вонючий. Его можно ограбить или поговорить (если он умеет)'

    constructor(unitRaw: IUnitRaw){
        super(unitRaw)
    }

    defaultActions = ['fight', 'talk', 'rob']

    getFeatureInfoIcon(){
        return {icon: '&#x1F6B6;', description: this.textName}
    }
}