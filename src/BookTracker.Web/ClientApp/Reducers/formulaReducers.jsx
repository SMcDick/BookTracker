import { combineReducers } from 'redux'
import { FORMULA_RETRIVED, FORMULA_POSTED, FORMULA_CHANGED } from '../ActionTypes'

const formulaReducer = (state = {}, action) => {
    const { type, settings } = action
    switch (type) {
        case FORMULA_RETRIVED:
        case FORMULA_CHANGED:
            return {
                ...state,
                settings
            }
        case FORMULA_POSTED:
        default:
            return state
    }
}

export default formulaReducer