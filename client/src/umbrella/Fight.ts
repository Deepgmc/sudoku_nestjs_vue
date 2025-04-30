import { computed, reactive, ref } from 'vue'
import type { IRound, IBodyPart, IFightMessage } from "@/interfaces/UnitInterfaces";
import type Unit from "@/umbrella/zoneEntities/Units/Unit";
import { FightParticipants } from '@/constants';

export default class Fight {

    private u1: Unit
    private u2: Unit

    private rounds: IRound[] = []
    private fightLog: IFightMessage[] = reactive([])

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

    roundFight(): boolean | Fight {
        let isError = false
        let who: FightParticipants = FightParticipants.U1
        if(!this.u1SelectedBlock.value || !this.u1selectedHitPart.value){
            isError = true
            who = FightParticipants.U1
        } else if(!this.u2SelectedBlock.value || !this.u2SelectedHitPart.value){
            isError = true
            who = FightParticipants.U2
        }
        if(isError){
            this.fightLog.push({who: who, text: 'Не выбрана цель атаки или блока'})
            return false
        }
        return this
    }

    nextRound(){

    }

    get fightLogList(){
        return this.fightLog
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