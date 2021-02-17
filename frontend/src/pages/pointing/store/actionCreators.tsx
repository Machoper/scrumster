import { ActionType } from "./actionType.enum";
import { fromJS } from 'immutable'

export const updateRoom = (data: any) => ({
    type: ActionType.UPDATE_ROOM,
    data: fromJS(data)
})
export const setRoomInfo = (room: any) => ({
    type: ActionType.SET_ROOM_INFO,
    room: fromJS(room)
})
export const updateCurrentUser = (user: any) => ({
    type: ActionType.UPDATE_CURRENT_USER,
    currentUser: fromJS(user)
})
export const cleanUp = () => ({
    type: ActionType.CLEAN_UP
})
