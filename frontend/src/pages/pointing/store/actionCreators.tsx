import { ActionType } from "./actionType.enum";
import { fromJS } from 'immutable'

export const setUsers = (data: any) => ({
    type: ActionType.SET_USERS,
    data: fromJS(data)
})
