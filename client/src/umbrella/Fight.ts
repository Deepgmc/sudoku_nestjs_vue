import { isProxy, reactive, ref, toRaw } from 'vue'
import type { IRound, IBodyPart, IFightMessage, IFightUnit, TStrikeResult } from "@/interfaces/UnitInterfaces";
import type Unit from "@/umbrella/zoneEntities/Units/Unit";
import { SLOT_TYPES, type IInventory, type IInventoryItem } from '@/interfaces/ItemsInterfaces';
import PlayerManager from './PlayerManager';

function getRandomWithin(min: number, max: number){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class Fight {

    private u1: Unit | PlayerManager
    private u2: Unit

    private rounds: IRound[] = []
    public currentRound !: IRound
    private fightLog: IFightMessage[] = reactive([])

    public isStarted = ref<boolean>()
    public isEnded = ref<boolean>()

    constructor(
        u1: Unit | PlayerManager,
        u2: Unit,
        private readonly isPlayerFight = false,
        private readonly fightCallback?: (showInventory: boolean) => any
    ) {
        //объекты берутся из пропсов вью, надо вернуть их обратно из прокси
        this.u1 = isProxy(u1) ? toRaw(u1) : u1
        this.u2 = isProxy(u2) ? toRaw(u2) : u2

        this.currentRound = this.newRound

        this.isStarted.value = false
        this.isEnded.value = false
    }

    startFight(){
        this.isStarted.value = true
    }

    public strikeTargetu1 = ref<SLOT_TYPES | undefined>()
    public blockTargetu1 = ref<SLOT_TYPES | undefined>()
    public strikeTargetu2 = ref<SLOT_TYPES | undefined>()
    public blockTargetu2 = ref<SLOT_TYPES | undefined>()

    private addNormalMessage = this.addFightMessage('black')
    private addSuccessMessage = this.addFightMessage('green')
    private addErrorMessage = this.addFightMessage('red')

    private nextRound(){
        this.addNormalMessage('<<< Следующий раунд >>>')
        this.rounds.push(this.currentRound)
        this.currentRound = this.newRound
        this.resetStrikesAndBlocks()
    }

    async roundFight(): Promise<boolean> {
        this.currentRound.unit1.strikeTarget.value = this.strikeTargetu1.value
        this.currentRound.unit1.blockTarget.value = this.blockTargetu1.value
        if(this.isPlayerFight){
            //если бой ведёт сам игрок (а не автоматический бой) то нужно автоматически атаковать и ставить блок
            this.currentRound.unit2.blockTarget.value = this.getRandomHitPartTarget().value
            this.currentRound.unit2.strikeTarget.value = this.getRandomHitPartTarget().value
        }

        if(this.checkSelectedHitBlockParts()){
            this.addErrorMessage('Не выбрана цель атаки или блока')
            return false
        }

        //кто ударяет первым
        this.makeAttackUnitsOrder()
        this.addNormalMessage(`attacker: ${this.currentRound.unit1.unit.textName}, target: ${this.currentRound.unit2.unit.textName}`)

        //проводим удары (внутри - смотрим блокирование)
        const strikeResult = this.makeAttack()
        this.currentRound.isFinished = strikeResult.isDead

        if(this.currentRound.isFinished){
            this.isEnded.value = true
            if(strikeResult.deadUnit){
                if(strikeResult.deadUnit.unit.isPlayer){
                    this.addErrorMessage('Вы проиграли. Возрождение на стартовой позиции.')
                } else {
                    this.addSuccessMessage('Бой закончился. Вы можете забрать предметы противника')
                }
                await this.fightEnd(strikeResult.deadUnit)
            }
        } else {
            this.nextRound()
        }
        return true
    }

    async fightEnd(deadUnit: IFightUnit) {
        if(this.isPlayerFight && typeof this.fightCallback === 'function') {
            this.getLoot(this.fightCallback(!deadUnit.unit.isPlayer))
            if(this.u1 instanceof PlayerManager){
                this.u1.setExperience(deadUnit.unit)
            }
            await deadUnit.unit.die()
        }
    }

    /**
     * Атака одного юнита другим, проверяется выбранный блок. Сама атака производится самим юнитом
     * @param attacker атакующий юнит
     * @param target обороняющийся юнит
     */
    private makeAttack(): TStrikeResult {
        //первая атака за раунд
        let attacker = this.currentRound.unit1
        let target = this.currentRound.unit2
        let strikeResult = this.strike(attacker, target)

        if(strikeResult.isDead){
            return strikeResult
        }

        //ответная атака, наоборот
        attacker = this.currentRound.unit2
        target = this.currentRound.unit1
        strikeResult = this.strike(attacker, target)

        return strikeResult
    }

    private strike(attacker: IFightUnit, target: IFightUnit): TStrikeResult {
        if(!this.isBlocking(attacker, target)){
            // блок не прошел, атакуем
            const hitResult = attacker.unit.hit(target.unit)
            this.addNormalMessage(hitResult.message)
            return {isDead: hitResult.isDead, deadUnit: target}
        } else {
            this.addNormalMessage(this.getBlockMessage(attacker, target))
            return {isDead: false, deadUnit: null}
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

    /**
     * Грабим побежденного юнита
     * @param lootInventory Созданный виртуальный инвентарь, куда скинуты все предметы побежденного юнита
     */
    getLoot(lootInventory: IInventory) {
        const items: IInventoryItem[] = []

        if(this.u2.equiped.head){
            items.push({item: this.u2.equiped.head, quantity: 1})
            this.u2.unequipItem(SLOT_TYPES.HEAD)
        }
        if(this.u2.equiped.body){
            items.push({item: this.u2.equiped.body, quantity: 1})
            this.u2.unequipItem(SLOT_TYPES.BODY)
        }
        if(this.u2.equiped.legs){
            items.push({item: this.u2.equiped.legs, quantity: 1})
            this.u2.unequipItem(SLOT_TYPES.LEGS)
        }
        lootInventory.addItems(items)
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

    addFightMessage(color: string) {
        return (text: string) => {
            if(text && text.length > 0){
                this.fightLog.push({who: 'arbiter', text, color: color})
            }
        }
    }

    getHitPartByValue(value: SLOT_TYPES){
        return this.getHitParts().find(item => item.value === value)
    }
}