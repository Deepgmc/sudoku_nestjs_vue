import type { TAction } from "@/interfaces/MapInterfaces";
import MapAction from "./MapAction";

export default class TalkAction extends MapAction {

    public textName: string = 'Поговорить'

    constructor(action: TAction){
        super(action)
    }

    activate(){
        console.log('%c TALK activate:', 'color:rgb(182, 86, 158);', 123)
    }

}