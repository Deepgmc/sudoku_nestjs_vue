import type CellEntity from './CellEntity.ts';
import { capitalizeFirstLetter } from './CellEntity.ts';
import House from './Objects/House.ts';
import HouseDump from './Objects/HouseDump.ts';
import SideStreet from './Objects/SideStreet.ts';
import Fence from './Objects/Fence.ts';
import Trees from './Objects/Trees.ts';
import type { TCellFeatures, ICellObject } from '@/interfaces/MapInterfaces.ts';


export function CellEntityFactory (
    cellObject: ICellObject,
    mapCellFeatures: TCellFeatures,
): CellEntity {
    let cellEntity: CellEntity | null = null
    try {
        cellEntity = eval(`new ${capitalizeFirstLetter(cellObject.name)}(cellObject, mapCellFeatures)`)
    } catch(_e: any) {
        cellEntity = null
    }
    if(cellEntity === null) throw new Error('Invalid EntityFactory creation')
    return cellEntity
}

