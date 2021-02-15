import { combineReducers } from 'redux-immutable'
import { reducer as headerReducer } from '../common/header/store/'
import { reducer as pointingReducer } from '../pages/pointing/store'
import { reducer as retroReducer } from '../pages/retro/store'

const reducer = combineReducers({
    header: headerReducer,
    pointing: pointingReducer,
    retro: retroReducer
})

export default reducer