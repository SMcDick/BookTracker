import * as types from '../ActionTypes'
import { getBaseUri } from './functions'
import { beginFetch, endFetch, errorFetch, logFetch, openSnack, closeSnack } from './commonActions'
import { MSG_SAVED } from '../strings'

export const refreshApiSettingsAction = () => {
    return {
        type: types.API_CONFIG_RETRIVED
    }
}

export const clearApiSettings = () => {
    return {
    }
}

export const saveApiSettingsAction = data => dispatch => {
    const baseUri = getBaseUri()

    dispatch(beginFetch())

    return fetch(`${baseUri}api/apisettings/`, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                dispatch(logFetch(JSON.stringify({ data: 'empty' }, null, 2)))
                dispatch(endFetch())
                dispatch(closeSnack())
                dispatch(openSnack(MSG_SAVED))
            }
        })
        .catch(err => {
            dispatch(errorFetch(err))
        })
}

export const loadApiSettingsAction = () => dispatch => {
    const baseUri = getBaseUri()
    dispatch(beginFetch())

    return fetch(`${baseUri}api/apisettings`)
        .then(response => response.json())
        .then(json => {
            dispatch(logFetch(JSON.stringify(json, null, 2)))
            dispatch(retrivedApiSettingsAction(json))
            dispatch(endFetch())
        })
        .catch(err => {
            dispatch(errorFetch(err))
        })
}

export const retrivedApiSettingsAction = (settings) => {
    return {
        type: types.API_CONFIG_RETRIVED,
        settings
    }
}

export const changedApiSettingsAction = (settings) => {
    return {
        type: types.API_CONFIG_CHANGED,
        settings
    }
}