import type { TAction } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";

export default class DigAction extends MapAction {

    public textName: string = 'Копать'

    constructor(action: TAction){
        super(action)
    }

    activate(){
        console.log('%c DIG activate:', 'color:rgb(182, 86, 158);', 123)
    }

}