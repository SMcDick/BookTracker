import * as types from '../ActionTypes'
import { getBaseUri } from './functions'
import { beginFetch, endFetch, errorFetch, logFetch, openSnack, closeSnack } from './commonActions'

export const refreshFormulaAction = () => {
    return {
        type: types.FORMULA_RETRIVED
    }
}

export const saveFormulaAction = data => dispatch => {
    const baseUri = getBaseUri()

    dispatch(beginFetch())

    return fetch(`${baseUri}api/formula/`, {
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
            }
        })
        .catch(err => {
            dispatch(errorFetch(err))
        })
}

export const loadFormulaAction = () => dispatch => {
    const baseUri = getBaseUri()
    dispatch(beginFetch())

    return fetch(`${baseUri}api/formula`)
        .then(response => response.json())
        .then(json => {
            dispatch(logFetch(JSON.stringify(json, null, 2)))
            dispatch(retrivedFormulaAction(json))
            dispatch(endFetch())
        })
        .catch(err => {
            dispatch(errorFetch(err))
        })
}

export const retrivedFormulaAction = (settings) => {
    return {
        type: types.FORMULA_RETRIVED,
        settings
    }
}

export const changedFormulaAction = (settings) => {
    return {
        type: types.FORMULA_CHANGED,
        settings
    }
}