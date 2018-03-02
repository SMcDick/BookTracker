import { MENU_TOOGLE, API_REQUEST_BEGIN, API_REQUEST_END, API_REQUEST_ERROR, API_REQUEST_LOG, SNACKBAR_OPEN, SNACKBAR_CLOSE } from '../ActionTypes'

export const toogleMenuAction = (isOpen) => {
    return {
        type: MENU_TOOGLE,
        isOpen
    }
}

export const beginFetch = () => {
    return {
        type: API_REQUEST_BEGIN
    }
}

export const endFetch = () => {
    return {
        type: API_REQUEST_END
    }
}

export const errorFetch = (error) => {
    return {
        type: API_REQUEST_ERROR,
        error
    }
}

export const logFetch = (json) => {
    return {
        type: API_REQUEST_LOG,
        json
    }
}

export const openSnack = (text) => {
    return {
        type: SNACKBAR_OPEN,
        text
    }
}

export const closeSnack = () => {
    return {
        type: SNACKBAR_CLOSE
    }
}