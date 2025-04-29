import type { TRawAction } from "@/interfaces/MapInterfaces";
import type Unit from "./Unit";
import { Homeless } from "./Homeless";
import { PortalGuard } from "./PortalGuard";
import { ActionsFactory } from "@/umbrella/actions/ActionsFactory";
import Inventory from "@/umbrella/items/Inventory";
import type { IUnitRaw } from "@/interfaces/UnitInterfaces";

export function UnitFactory (
    unitRaw: IUnitRaw
): Unit {
    let unit: Unit | null
    try {
        switch(unitRaw.name){
            case 'homeless':
                unit = new Homeless(unitRaw)
                break;
            case 'portalGuard':
                unit = new PortalGuard(unitRaw)
                break;
            default:
                unit = null
        }
    } catch(_e: any) {
        throw new Error('Invalid UnitFactory creation ' + unitRaw.name)
    }
    if(unit === null) throw new Error('Invalid EntityFactory creation ' + unitRaw.name)

    //hydrating actions for this unit
    unit.actions = unit.defaultActions.concat(unit.generalDefaultActions, unit.defaultEntityActions, unit.mapUnitActions)
        .map((rawAction: TRawAction) => {
            return ActionsFactory(rawAction, unit)
        })

    //hydrating unit items
    unit.inventory = new Inventory(unitRaw.items, false, 5)
    unit.equipItems(unitRaw.equiped)

    return unit
}