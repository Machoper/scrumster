import { combineReducers } from 'redux-immutable'
import { reducer as headerReducer } from '../common/header/store/'
import { reducer as pointingReducer } from '../pages/pointing/store'

const reducer = combineReducers({
    header: headerReducer,
    pointing: pointingReducer
})

export default reducer