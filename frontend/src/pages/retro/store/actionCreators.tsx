import { ActionType } from "./actionType.enum";
import { fromJS } from 'immutable'

export const setViewMode = (viewMode: boolean) => ({
    type: ActionType.SET_VIEW_MODE,
    viewMode
})
