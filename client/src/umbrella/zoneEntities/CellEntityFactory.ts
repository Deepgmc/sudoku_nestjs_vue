import type CellEntity from './CellObjects/CellEntity.ts';
import House from './CellObjects/House.ts';
import HouseDump from './CellObjects/HouseDump.ts';
import SideStreet from './CellObjects/SideStreet.ts';
import Fence from './CellObjects/Fence.ts';
import Trees from './CellObjects/Trees.ts';
import type { TCellRawFeatures, ICellObject, TRawAction } from '@/interfaces/MapInterfaces.ts';
import { ActionsFactory } from '../actions/ActionsFactory.ts';


export function CellEntityFactory (
    cellObject: ICellObject,
    mapCellFeatures: TCellRawFeatures,
): CellEntity {
    let cellEntity: CellEntity | null = null
    try {
        //cellEntity = eval(`new ${capitalizeFirstLetter(cellObject.name)}(cellObject, mapCellFeatures)`)
        switch(cellObject.name){
            case 'house':
                cellEntity = new House(cellObject, mapCellFeatures)
                break;
            case 'fence':
                cellEntity = new Fence(cellObject, mapCellFeatures)
                break;
            case 'houseDump':
                cellEntity = new HouseDump(cellObject, mapCellFeatures)
                break;
            case 'sideStreet':
                cellEntity = new SideStreet(cellObject, mapCellFeatures)
                break;
            case 'trees':
                cellEntity = new Trees(cellObject, mapCellFeatures)
                break;
        }
    } catch(_e: any) {
        cellEntity = null
    }
    if(cellEntity === null) throw new Error('Invalid EntityFactory creation ' + cellObject.name)

    //hydrating actions for map cell-actions
    cellEntity.actions = cellEntity.generalDefaultActions.concat(cellEntity.defaultEntityActions).map((rawAction: TRawAction) => {
        return ActionsFactory(rawAction)
    })

    return cellEntity
}

function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}