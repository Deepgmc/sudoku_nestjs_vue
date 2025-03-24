import type { TAction } from "@/interfaces/MapInterfaces";
import ActionBase from "./ActionBase";

export default class MoveAction extends ActionBase {

    constructor(action: TAction){
        super(action)
    }

    moveplayer(){
        console.log('%c asdasdsad:', 'color:rgb(182, 86, 158);', 345435)
    }

}