import { reactive, ref, type Ref, type SlotsType } from "vue";
import {
    ITEM_TYPES,
    SLOT_TYPES,
    type IInventory,
    type IInventoryItem,
    type IItem,
    type TItemId,
    type TSlotItem
} from "@/interfaces/ItemsInterfaces";
import { equipSlots } from '@/constants';
import type { IEquiped, IRawEquiped } from "@/interfaces/ItemsInterfaces";
import type { TCoords, TRawActions } from "@/interfaces/MapInterfaces";
import type MapAction from "@/umbrella/actions/MapAction";
import Item from "@/umbrella/items/Items";
import type { IUnitRaw, TUnitStats } from "@/interfaces/UnitInterfaces";
import ChatManager from "@/umbrella/ChatManager.ts"
import PlayerManager from "@/umbrella/PlayerManager";
import AreaManager from "@/umbrella/AreaManager";


export default abstract class Unit {

    abstract icon: string
    constructor(public isPlayer: boolean = false, unitRaw?: IUnitRaw){
        if(this.isPlayer && unitRaw){ //создаём юнита на карте, а не игрока
            this.objectName = unitRaw.name
            this.mapUnitActions = unitRaw.actions
        }

        const equipedObject = equipSlots.reduce<IEquiped>((acc, slot: TSlotItem) => {
            acc[slot.name as keyof IRawEquiped] = null
            return acc
        }, {} as IEquiped)
        this.equiped = reactive(equipedObject)
    }

    initUnit(stats: TUnitStats, coords?: TCoords){
        this.level.value         = stats.level
        this.experience.value    = stats.experience
        this.currentHealth.value = stats.currentHealth
        this.maxHealth.value     = stats.maxHealth
        this.strength.value      = stats.strength
        this.agility.value       = stats.agility
        this.intellect.value     = stats.intellect

        if(coords){
            this.coords = {x: coords.x, y: coords.y}
        }
    }

    public objectName: string = ''
    abstract textName: string
    abstract chatDescription: string
    abstract defaultActions: TRawActions
    abstract defaultEntityActions: TRawActions

    public mapUnitActions: TRawActions = []
    public generalDefaultActions: TRawActions = []
    public actions: MapAction[] = [] as MapAction[] //собранные с разных источников действия для этого конкретного unit

    public inventory: IInventory = {} as IInventory
    public equiped: IEquiped

    public level         = ref<number>(0)
    public experience    = ref<number>(0)
    public currentHealth = ref<number>(0)
    public maxHealth     = ref<number>(0)
    public strength      = ref<number>(0)
    public agility       = ref<number>(0)
    public intellect     = ref<number>(0)

    coords !: TCoords

    getArmor(): number {
        let totalArmor = 0
        if(this.equiped[SLOT_TYPES.HEAD] !== null) {
            totalArmor += this.equiped[SLOT_TYPES.HEAD].armor
        }
        if(this.equiped[SLOT_TYPES.BODY] !== null) {
            totalArmor += this.equiped[SLOT_TYPES.BODY].armor
        }
        if(this.equiped[SLOT_TYPES.LEGS] !== null) {
            totalArmor += this.equiped[SLOT_TYPES.LEGS].armor
        }
        return totalArmor
    }

    isSlotEmpty(slotType: SLOT_TYPES): boolean {
        return this.equiped[slotType as keyof IEquiped] === null
    }

    equipItems(equipedRaw: IRawEquiped): void {
        //"одеваем" вещи при инициализации
        equipSlots.forEach((slot: TSlotItem) => {
            if(equipedRaw[slot.name as keyof IRawEquiped].quantity > 0){
                this.equipItem(
                    Item.hydrateRawItem(equipedRaw[slot.name as keyof IRawEquiped]),
                    slot.name
                )
            }
        })
    }

    isItemEquiped(itemId: TItemId, slotType: SLOT_TYPES){
        const item = this.getItemInSlot(slotType as keyof IEquiped)
        if(!item) return false
        return item.itemId === itemId
    }

    equipItem(item: IInventoryItem, slotType: SLOT_TYPES): boolean{
        if(!this.isSlotEmpty(slotType)){
            return false
        }
        this.applyItemStats(item.item, 'add')
        this.equiped[slotType as keyof IEquiped] = item.item
        return true
    }

    unequipItem(slotType: string){
        const item = this.equiped[slotType as keyof IEquiped]
        if(item !== null){
            this.applyItemStats(item, 'remove')
        }
        this.equiped[slotType as keyof IEquiped] = null
    }

    applyItemStats(item: IItem, actionType: string): boolean {
        if(item.type === ITEM_TYPES.CLOTHES) {
            if(item.intellect) {
                if(actionType === 'add') {
                    this.intellect.value += item.intellect

                } else {
                    this.intellect.value -= item.intellect
                }
            }
            if(item.strength) {
                if(actionType === 'add') {
                    this.strength.value += item.strength
                } else {
                    this.strength.value -= item.strength
                }
            }
            if(item.agility) {
                if(actionType === 'add') {
                    this.agility.value += item.agility
                } else {
                    this.agility.value -= item.agility
                }
            }
            if(item.add_health) {
                if(actionType === 'add') {
                    this.maxHealth.value += item.add_health
                    this.currentHealth.value += item.add_health
                } else {
                    this.maxHealth.value -= item.add_health
                    this.currentHealth.value -= item.add_health
                }
            }
        } else {
            return false
        }
        return true
    }

    getItemInSlot(slot: keyof IEquiped): IItem | null {
        return this.equiped[slot]
    }

    /**
     * Восстанавливаем здоровье, не больше максимального запаса
     * @param addHealth сколько восстанавливается здоровья
     */
    heal(addHealth: number): Unit {
        const chat = ChatManager.getInstance()

        let healedValue = 0
        if(this.maxHealth.value - this.currentHealth.value <= addHealth){
            healedValue = this.maxHealth.value - this.currentHealth.value
            this.currentHealth.value = this.maxHealth.value
        } else {
            this.currentHealth.value += addHealth
            healedValue = addHealth
        }
        chat.addMessage(ChatManager.getChatMessage(`Вы восстановили ${healedValue} здоровья`))
        return this
    }

    /**
     * Производим удар по target юниту, с учётом оржия, статов и пр.
       Блок уже должен быть вычислен в классе Fight, если добрались сюда, значит точно ударяем
     * @param target юнит, которого атакуем
     */
    hit(target: Unit): {isDead: boolean, message: string} {
        let isDead = false
        let message = ''
        const attackerDamage = this.getDamage()
        let incomeDamage = attackerDamage - target.getArmor()
        if(incomeDamage <= 0) incomeDamage = 0
        if(target.currentHealth.value > incomeDamage) {
            //цель атаки получает несмертельный урон
            target.currentHealth.value -= incomeDamage
            message = `${target.textName} теряет ${incomeDamage} здоровья`
        } else {
            //цель атаки умирает (может быть и игрок и юнит)
            target.currentHealth.value = 0
            isDead = true
            message = `${target.textName} теряет ${incomeDamage} здоровья и умирает`
        }

        return {
            isDead, message: message
        }
    }

    async die(attacker ?: Unit): Promise<boolean> {
        if(this.isPlayer){
            if(attacker) attacker.fullHeal()
            return PlayerManager.getInstance().rebornPlayer()
        }
        //если это не игрок - убиваем юнита
        return AreaManager.getInstance().store.removeUnitFromZone(this.objectName, {x: this.coords.x, y: this.coords.y})
    }

    public getDamage(): number {
        const weapon = this.getItemInSlot('rhand')
        const unurmoredDamage = this.getUnurmoredDamage()
        if(!weapon){
            return unurmoredDamage
        }
        return unurmoredDamage + this.calculateWeaponDamage(weapon)
    }

    public calculateWeaponDamage(weapon: IItem) {
        return Math.floor(weapon.damage + (this.strength.value / 10 * weapon.damage))
    }

    /**
    * на основе текущего опыта проверяет нужно ли повышать уровень, добавляет опыт и уровень если надо
    */
    setExperience(killedUnit: Unit): void {
        const needExpNextLvl = this.getUnitLevelExp(this.level.value)
        const unitGainExp = this.getUnitLevelExp(killedUnit.level.value) / 5
        const expOverflow = unitGainExp - (needExpNextLvl - this.experience.value)
        if(expOverflow >= 0){
            this.experience.value = expOverflow
            this.level.value++
        } else {
            this.experience.value += unitGainExp
        }
    }

    /**
    * Вычисляет кол-во опыта, необходимого на данном уровне
    * @param level уровень для расчета
    * @returns кол-во опыта
    */
    public getUnitLevelExp(level: number): number{
        const decreaseRatio = 0.5
        const prevLvl = (level - 1) || 1

        return level * 100 * prevLvl * decreaseRatio
    }

    public getUnurmoredDamage(): number {
        return this.strength.value
    }

    public fullHeal(): void {
        //исцеляет моба "магически" после боя с игроком
        this.currentHealth.value = this.maxHealth.value
    }
}