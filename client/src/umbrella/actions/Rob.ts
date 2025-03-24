import type { TAction } from "@/interfaces/MapInterfaces";
import ActionBase from "./ActionBase";

export default class RobAction extends ActionBase {

    constructor(action: TAction){
        super(action)
    }

}