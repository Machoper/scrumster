import { fromJS } from 'immutable'

const defautltState = fromJS({})

const reducer = (state = defautltState, action: any) => {
    switch(action.type) {
        default:
            return state
    }
}

export default reducer