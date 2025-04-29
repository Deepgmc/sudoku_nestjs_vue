import { computed, ref } from 'vue'
import type { IRound, IBodyPart } from "@/interfaces/UnitInterfaces";
import type Unit from "@/umbrella/zoneEntities/Units/Unit";

export default class Fight {

    private u1: Unit
    private u2: Unit

    private rounds: IRound[] = []

    public isStarted = ref<boolean>()

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
        this.isStarted.value = true
        const newRound = {
            u1BlockTarget: undefined,
            u1StrikeTarget: undefined,
            u2BlockTarget: undefined,
            u2StrikeTarget: undefined,
            isFinished: false
        }

        this.rounds.push(newRound)
    }

    roundFight(){

    }

    nextRound(){

    }

    public u1SelectedBlock = ref<string>()
    public u1selectedHitPart = ref<string>()

    public u2SelectedBlock = ref<string>()
    public u2SelectedHitPart = ref<string>()

    //части тела, которые можно атаковать и блокировать
    getHitParts(type?: 'block' | 'strike'): IBodyPart[] {
        const color = type === 'strike' ? 'red' : 'green'
        return [
            {
                value: 'head',
                label: 'Голова',
                icon: '128100',
                color: color,
            },
            {
                value: 'body',
                label: 'Тело',
                icon: '128085',
                color: color,
            },
            {
                value: 'legs',
                label: 'Ноги',
                icon: '128086',
                color: color,
            },
        ]
    }

    getHitPartByValue(value: string){
        return this.getHitParts().find(item => item.value === value)
    }
}