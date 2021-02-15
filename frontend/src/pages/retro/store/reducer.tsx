import { fromJS } from 'immutable'
import { ActionType } from './actionType.enum'

const defautltState = fromJS({
    viewMode: false
})

const reducer = (state = defautltState, action: any) => {
    switch(action.type) {
        case ActionType.SET_VIEW_MODE:
            return state.set('viewMode', action.viewMode)
        default:
            return state
    }
}

export default reducer