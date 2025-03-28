import type { TAction } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";

export default class AskAboutHome extends MapAction {

    public textName: string = 'Спросить про дом'

    constructor(action: TAction){
        super(action)
    }

    activate(){
        console.log('%c ASKABOUT activate:', 'color:rgb(182, 86, 158);', 123)
    }

}