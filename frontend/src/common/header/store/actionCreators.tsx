import { ActionType } from "./actionType.enum";
import { fromJS } from 'immutable'

export const setSelectedMenuKeys = (data: string[]) => ({
    type: ActionType.SET_SELECTED_MENU_KEYS,
    data: fromJS(data)
})

