import type CellEntity from './CellEntity.ts';
import House from './Objects/House.ts';
import HouseDump from './Objects/HouseDump.ts';
import SideStreet from './Objects/SideStreet.ts';
import Fence from './Objects/Fence.ts';
import Trees from './Objects/Trees.ts';
import type { TCellFeatures, TCellObjOptions } from '@/interfaces/MapInterfaces.ts';
import type { TObjectNames } from './zoneEntities.ts';


export function CellEntityFactory (
    name: TObjectNames,
    mapCellOptions: TCellObjOptions,
    mapCellFeatures: TCellFeatures,
): CellEntity {
    let cellEntity: CellEntity | null = null
    try {
        cellEntity = eval(`new ${capitalizeFirstLetter(name)}(name, mapCellOptions, mapCellFeatures)`)
    } catch(_e: any) {
        cellEntity = null
    }
    if(cellEntity === null) throw new Error('Invalid EntityFactory creation')
    return cellEntity
}

function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}