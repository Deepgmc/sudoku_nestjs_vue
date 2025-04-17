import CellEntity from './CellObjects/CellEntity.ts';
import House from './CellObjects/House.ts';
import HouseDump from './CellObjects/HouseDump.ts';
import SideStreet from './CellObjects/SideStreet.ts';
import Fence from './CellObjects/Fence.ts';
import Trees from './CellObjects/Trees.ts';
import type { TCellRawFeatures, ICellObject, TRawAction, TCoords } from '@/interfaces/MapInterfaces.ts';
import { ActionsFactory } from '../actions/ActionsFactory.ts';
import Inventory from '../items/Inventory.ts';


export function CellEntityFactory (
    cellObject: ICellObject,
    mapCellFeatures: TCellRawFeatures,
    coords: TCoords
): CellEntity {
    let cellEntity: CellEntity | null = null
    try {
        //cellEntity = eval(`new ${capitalizeFirstLetter(cellObject.name)}(cellObject, mapCellFeatures)`)
        switch(cellObject.name){
            case 'house':
                cellEntity = new House(cellObject, mapCellFeatures, coords)
                break;
            case 'fence':
                cellEntity = new Fence(cellObject, mapCellFeatures, coords)
                break;
            case 'houseDump':
                cellEntity = new HouseDump(cellObject, mapCellFeatures, coords)
                break;
            case 'sideStreet':
                cellEntity = new SideStreet(cellObject, mapCellFeatures, coords)
                break;
            case 'trees':
                cellEntity = new Trees(cellObject, mapCellFeatures, coords)
                break;
        }
    } catch(_e: any) {
        throw new Error('Wrong CellEntity creation')
    }
    if(cellEntity === null) throw new Error('Invalid EntityFactory creation ' + cellObject.name)

    //hydrating actions for map cell-actions
    cellEntity.actions = cellEntity.generalDefaultActions.concat(cellEntity.defaultEntityActions).map((rawAction: TRawAction) => {
        return ActionsFactory(rawAction)
    })

    //hydrating items on that map cell
    cellEntity.inventory = new Inventory(cellObject.items)

    return cellEntity
}