import { fromJS } from 'immutable'
import { ActionType } from './actionType.enum'

const defautltState = fromJS({
    players: [],
    observers: []
})

const reducer = (state = defautltState, action: any) => {
    switch(action.type) {
        case ActionType.SET_USERS:
            return state.merge({
                players: action.data.get('players'),
                observers: action.data.get('observers')
            })
        default:
            return state
    }
}

export default reducer