import { SLOT_TYPES, type TSlotItem } from '@/interfaces/ItemsInterfaces';
export const equipSlots: TSlotItem[] = [
    {name: SLOT_TYPES.HEAD, textName: 'Голова'},
    {name: SLOT_TYPES.BODY, textName: 'Тело'},
    {name: SLOT_TYPES.LEGS, textName: 'Ноги'},
    {name: SLOT_TYPES.RHAND, textName: 'П рука'},
    {name: SLOT_TYPES.LHAND, textName: 'Л рука'},
]

export enum RESPONSE_STATUS_CODES {
    SUCCESS      = 200,
    CREATED      = 201,
    UNAUTHORIZED = 401,
    NOT_FOUND    = 404,
    SERVER_ERR   = 500,
}