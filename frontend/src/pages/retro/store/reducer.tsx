import { fromJS } from 'immutable'
import { ActionType } from './actionType.enum'

const defautltState = fromJS({
    viewMode: false,
    roomId: '',
    roomName: '',
    currentUser: {}
})

const reducer = (state = defautltState, action: any) => {
    switch(action.type) {
        case ActionType.SET_VIEW_MODE:
            return state.set('viewMode', action.viewMode)
        case ActionType.SET_ROOM_INFO:
            return state.merge({
                roomId: action.room.get('id'),
                roomName: action.room.get('name')
            })
        case ActionType.UPDATE_CURRENT_USER:
            return state.set('currentUser', action.currentUser)
        case ActionType.CLEAN_UP:
            return defautltState
        default:
            return state
    }
}

export default reducer