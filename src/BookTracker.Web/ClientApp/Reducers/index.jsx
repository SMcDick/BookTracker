import { combineReducers } from 'redux'

import * as types from '../ActionTypes'

const request = (state = { isFetching: false, didInvalidate: false, data: {} }, action) => {
    switch (action.type) {
        case types.API_REQUEST_BEGIN:
            return {
                ...state,
                isFetching: true,
                data: null,
                didInvalidate: false,
                errorMsg: ''
            }
        case types.API_REQUEST_END:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                data: action.data,
                errorMsg: ''
            }
        case types.API_REQUEST_ERROR:
            return {
                ...state,
                isFetching: false,
                didInvalidate: true,
                errorMsg: action.errorMsg,
                data: null
            }
    }
}

const apiReducer = (state = {}, action) => {
    switch (action.type) {
        case types.API_REQUEST_BEGIN:
        case types.API_REQUEST_END:
        case types.API_REQUEST_ERROR:
            const nState = {
                ...state,
                api: request(state.api, action)
            }
        default:
            return state;
    }
}

const dReducer = (state = {}, action) => {
    return state
}


// Updates error message to notify about the failed fetches.
const errorMessageReducer = (state = null, action) => {
    const { type, error } = action

    if (type === types.RESET_ERROR_MESSAGE) {
        return null
    } else if (error) {
        return error
    }

    return state
}

const rootReducer = combineReducers({
    apiReducer,
    errorMessageReducer,
    dReducer
})

export default rootReducer