import type { ICellObject, TCellRawFeatures, TCellRawUnits, TCoords } from "@/interfaces/MapInterfaces"
import CellEntity from "./CellEntity.ts"

export default class House extends CellEntity {
    private floors: number
    private isEntrance: boolean

    public passability: boolean = false
    public canDig: boolean = false
    public backgroundClass: string = 'houseResidental'
    public defaultEntityActions: string[] = []
    public textName: string = 'Жилое здание'
    public chatDescription = 'Высотное здание. Вы можете заглянуть только в окна первого этажа. Там все разбито, покрыто пылью и т.п. Обычно на первых этажах таких зданий нет ничего интересного.'

    constructor(
        objectName: ICellObject,
        mapCellFeatures: TCellRawFeatures,
        mapCellUnits: TCellRawUnits,
        coords: TCoords
    ){
        super(objectName, mapCellFeatures, mapCellUnits, coords)
        this.floors = objectName.floor
        this.isEntrance = objectName.isEntrance
        this.generateInfoIcons()
    }

    generateInfoIcons(){
        if(this.isEntrance){
            this.infoIcons.push({icon: '&#128682;', description: 'Вход в здание'})
            //this.features.push('houseEntrance')
        }
    }

    getInfoDescription(){
        const text: string[] = []
        text.push('Вид мрачный, заброшенный. Окон, конечно, нет. Панельные стены выглядят вполне крепкими.')
        text.push(`Вы посчитали количество этажей, их ${this.floors}.`)
        if(!this.isEntrance) {
            text.push(`В данной части входа нет, стена и окна этажей до самого верха.`)
        } else {
            text.push(`Это парадная часть, весь пролёт до ${this.floors} этажа это, вероятно, были лифты. Вход завален хламом, но пробраться можно.`)
        }
        return text.join(' ')
    }
}