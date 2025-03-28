import type { TAction } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";

export default class RobAction extends MapAction {

    public textName: string = 'Ограбить'

    constructor(action: TAction){
        super(action)
    }

    activate(){
        console.log('%c ROB activate:', 'color:rgb(182, 86, 158);', 123)
    }

}