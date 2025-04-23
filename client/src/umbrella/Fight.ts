import { computed, ref, type Ref } from 'vue'
import type { IRound } from "@/interfaces/Unit";
import type Unit from "@/umbrella/zoneEntities/Units/Unit";

export default class Fight {

    private u1: Unit
    private u2: Unit

    private rounds: IRound[] = []

    public isStarted = ref(false)

    constructor(u1: Unit, u2: Unit){
        this.u1 = u1
        this.u2 = u2
        this.isStarted.value = false
    }

    get unitLeft(){
        return this.u1
    }
    get unitRight(){
        return this.u2
    }

    startFight(){
        console.log('%c Fight starting:', 'color:rgb(182, 86, 158);', 122123)
        this.isStarted.value = true
    }
}