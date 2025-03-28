import type { TAction } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";

export default class FightAction extends MapAction {

    public textName: string = 'Напасть'

    constructor(action: TAction){
        super(action)
    }

    activate(){
        console.log('%c FIGHT activate:', 'color:rgb(182, 86, 158);', 123)
    }

}