import { fromJS } from 'immutable'
import { ActionType } from './actionType.enum'

const defautltState = fromJS({
    selectedMenuKeys: []
})

const reducer = (state = defautltState, action: any) => {
    switch(action.type) {
        case ActionType.SET_SELECTED_MENU_KEYS:
            return state.set('selectedMenuKeys', action.data)
        default:
            return state
    }
}

export default reducer