import type { IRawFeature } from "@/interfaces/MapInterfaces";
import FeatureEntity from "./FeatureEntity";

export class Portal extends FeatureEntity {

    textName: string = 'Переход в другую зону'
    public defaultEntityActions: string[] = []
    public isUnit = false
    public chatDescription = 'Впереди вы видите загадочное завихрение синеватого цвета, висящее в воздухе. Что-то магическое. Или научное. При взгляде на него в мозгу проскальзывает строго звучащее слово "портал", что-бы оно ни значило'

    constructor(featureRaw: IRawFeature){
        super(featureRaw)
    }

    defaultActions = []

    getFeatureInfoIcon(){
        return {icon: '&#x1F300;', description: this.textName}
    }
}