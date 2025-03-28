import type { TAction } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";

export default class LookAction extends MapAction {

    public textName: string = 'Осмотреть'

    constructor(action: TAction){
        super(action)
    }

    activate(){
        console.log('%c LOOK activate:', 'color:rgb(182, 86, 158);', 123)
    }

}