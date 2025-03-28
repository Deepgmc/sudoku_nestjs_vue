import type { TAction } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";

export default class LookWindowAction extends MapAction {

    public textName: string = 'Заглянуть в окно'

    constructor(action: TAction){
        super(action)
    }

    activate(){
        console.log('%c LOOKWINDOW activate:', 'color:rgb(182, 86, 158);', 123)
    }
}