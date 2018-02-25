import * as types from '../ActionTypes'

export const beginFetch = () => {
    return {
        type: types.API_REQUEST_BEGIN
    }
}

export const endFetch = () => {
    return {
        type: types.API_REQUEST_END
    }
}

export const errorFetch = (error) => {
    return {
        type: types.API_REQUEST_ERROR,
        error
    }
}

export const logFetch = (json) => {
    return {
        type: types.API_REQUEST_LOG,
        json
    }
}

export const openSnack = (text) => {
    return {
        type: types.SNACKBAR_OPEN,
        text
    }
}

export const closeSnack = () => {
    return {
        type: types.SNACKBAR_CLOSE
    }
}