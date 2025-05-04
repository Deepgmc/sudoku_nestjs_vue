import { isProxy, reactive, ref, toRaw } from 'vue'
import type { IRound, IBodyPart, IFightMessage, IFightUnit } from "@/interfaces/UnitInterfaces";
import type Unit from "@/umbrella/zoneEntities/Units/Unit";
import { SLOT_TYPES } from '@/interfaces/ItemsInterfaces';

function getRandomWithin(min: number, max: number){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class Fight {

    private u1: Unit
    private u2: Unit

    private rounds: IRound[] = []
    public currentRound !: IRound
    private fightLog: IFightMessage[] = reactive([])

    public isStarted = ref<boolean>()

    constructor(u1: Unit, u2: Unit, private readonly isPlayerFight = false) {
        //объекты берутся из пропсов вью, надо вернуть их обратно из прокси
        this.u1 = isProxy(u1) ? toRaw(u1) : u1
        this.u2 = isProxy(u2) ? toRaw(u2) : u2

        this.currentRound = this.newRound

        this.isStarted.value = false
    }

    startFight(){
        this.isStarted.value = true
    }

    public strikeTargetu1 = ref<SLOT_TYPES | undefined>()
    public blockTargetu1 = ref<SLOT_TYPES | undefined>()
    public strikeTargetu2 = ref<SLOT_TYPES | undefined>()
    public blockTargetu2 = ref<SLOT_TYPES | undefined>()

    private nextRound(){
        this.addFightMessage('<<< Следующий раунд >>>')
        this.rounds.push(this.currentRound)
        this.currentRound = this.newRound
        this.resetStrikesAndBlocks()
    }

    async roundFight(): Promise<boolean | Fight> {
        this.currentRound.unit1.strikeTarget.value = this.strikeTargetu1.value
        this.currentRound.unit1.blockTarget.value = this.blockTargetu1.value
        if(this.isPlayerFight){
            //если бой ведёт сам игрок (а не автоматический бой) то нужно автоматически атаковать и ставить блок
            this.currentRound.unit2.blockTarget.value = this.getRandomHitPartTarget().value
            this.currentRound.unit2.strikeTarget.value = this.getRandomHitPartTarget().value
        }

        if(this.checkSelectedHitBlockParts()){
            this.addFightMessage('Не выбрана цель атаки или блока')
            return false
        }

        //кто ударяет первым
        this.makeAttackUnitsOrder()
        this.addFightMessage(`attacker: ${this.currentRound.unit1.unit.textName}, target: ${this.currentRound.unit2.unit.textName}`)

        //проводим удары (внутри - смотрим блокирование)
        this.currentRound.isFinished = await this.makeAttack()

        if(this.currentRound.isFinished){
            this.addFightMessage('!! Fight end')
        } else {
            this.nextRound()
        }

        return this
    }

    /**
     * Атака одного юнита другим, проверяется выбранный блок. Сама атака производится самим юнитом
     * @param attacker атакующий юнит
     * @param target обороняющийся юнит
     */
    private async makeAttack(): Promise<boolean> {
        //первая атака за раунд
        let attacker = this.currentRound.unit1
        let target = this.currentRound.unit2
        let isDead = false
        isDead = await this.strike(attacker, target)

        if(isDead){
            return true
        }

        //ответная атака, наоборот
        attacker = this.currentRound.unit2
        target = this.currentRound.unit1
        isDead = await this.strike(attacker, target)

        if(isDead){
            return true
        }
        return false
    }

    private async strike(attacker: IFightUnit, target: IFightUnit): Promise<boolean> {
        if(!this.isBlocking(attacker, target)){
            // блок не прошел, атакуем
            const hitResult = await attacker.unit.hit(target.unit)
            this.addFightMessage(hitResult.message)
            return hitResult.isDead
        } else {
            this.addFightMessage(this.getBlockMessage(attacker, target))
            return false
        }
    }

    isBlocking(attacker: IFightUnit, target: IFightUnit): boolean {
        return attacker.strikeTarget.value === target.blockTarget.value
    }

    getBlockMessage(attacker: IFightUnit, blocker: IFightUnit): string {
        if(typeof blocker.blockTarget.value !== 'undefined'){
            const bodyPart = this.getHitPartByValue(blocker.blockTarget.value)?.label
            if(bodyPart === '') return ''
            return `${blocker.unit.textName} заблокировал атаку в ${bodyPart}`
        }
        return ''
    }

    get newRound(){
        return {
            unit1: {
                unit: this.u1,
                strikeTarget: ref<SLOT_TYPES | undefined>(),
                blockTarget: ref<SLOT_TYPES | undefined>(),
            },
            unit2: {
                unit: this.u2,
                strikeTarget: ref<SLOT_TYPES | undefined>(),
                blockTarget: ref<SLOT_TYPES | undefined>(),
            },
            isFinished: false
        }
    }

    /**
     * Определяем кто начинает раунд первым на основе суммы статов - у кого больше тот и первый
        переделывать бой больше чем на 2 игрока не планируется даже в теории, поэтому вычисляется так "в лоб"
     * @returns unit1 - всегда атакующий, unit2 обороняющийся
     */
    makeAttackUnitsOrder(): void {
        const tmpu1 = this.currentRound.unit1
        const tmpu2 = this.currentRound.unit2
        if(
            tmpu1.unit.strength.value + tmpu1.unit.agility.value + tmpu1.unit.intellect.value >=
            tmpu2.unit.strength.value + tmpu2.unit.agility.value + tmpu2.unit.intellect.value
        ){
            this.currentRound.unit1 = tmpu1
            this.currentRound.unit2 = tmpu2
        } else {
            this.currentRound.unit1 = tmpu2
            this.currentRound.unit2 = tmpu1
        }
    }

    /**
     * Выбраны ли все части для атаки и блока
     * @returns да/нет
     */
    checkSelectedHitBlockParts(): boolean {
        if(
            (!this.currentRound.unit1.blockTarget.value || !this.currentRound.unit1.strikeTarget.value) ||
            (!this.currentRound.unit2.blockTarget.value || !this.currentRound.unit2.strikeTarget.value)
        ){
            return true
        }
        return false
    }

    private resetStrikesAndBlocks(){
        this.strikeTargetu1.value = undefined
        this.blockTargetu1.value = undefined
        this.strikeTargetu2.value = undefined
        this.blockTargetu2.value = undefined
    }

    private getRandomHitPartTarget(): IBodyPart{
        const hitParts = this.getHitParts()
        return hitParts[getRandomWithin(0, hitParts.length - 1)]
    }

    //части тела, которые можно атаковать и блокировать
    getHitParts(type?: 'block' | 'strike'): IBodyPart[] {
        const color = type === 'strike' ? 'red' : 'green'
        return [
            {
                value: SLOT_TYPES.HEAD,
                label: 'Голова',
                icon: '128100',
                color: color,
            },
            {
                value: SLOT_TYPES.BODY,
                label: 'Тело',
                icon: '128085',
                color: color,
            },
            {
                value: SLOT_TYPES.LEGS,
                label: 'Ноги',
                icon: '128086',
                color: color,
            },
        ]
    }

    get fightLogList(){
        return this.fightLog
    }

    addFightMessage(text: string){
        if(text && text.length > 0){
            this.fightLog.push({who: 'arbiter', text})
        }
    }

    getHitPartByValue(value: SLOT_TYPES){
        return this.getHitParts().find(item => item.value === value)
    }
}