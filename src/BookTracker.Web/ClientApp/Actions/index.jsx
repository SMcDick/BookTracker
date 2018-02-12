import * as types from '../ActionTypes'

const getBaseUri = () => {
    return window.location.protocol + '\\\\' + window.location.host + '\\'
}

export const toogleMenuAction = (isOpen) => {
    return {
        type: types.MENU_TOOGLE,
        isOpen
    }
}

export const addBookToSearch = (isbn) => {
    return {
        type: types.BOOK_SEARCH_ADD,
        isbn
    }
}

export const removeBookToSearch = (isbn) => {
    return {
        type: types.BOOK_SEARCH_REMOVE,
        isbn
    }
}

export const retrivedBook = (book) => {
    return {
        type: types.BOOK_SEARCH_RETRIVED,
        book
    }
}

export const clearBookList = () => {
    return {
        type: types.BOOK_SEARCH_CLEAR
    }
}

export const refreshBookList = bookColl => dispatch => {
    dispatch(clearBookList())

    bookColl.map((book, index) => {
        return dispatch(fetchBook(book))
    })
}

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

export const fetchBook = book => dispatch => {
    const baseUri = getBaseUri()

    dispatch(beginFetch())
    return fetch(`${baseUri}api/Book/${book}`)
        .then(response => response.json())
        .then(json => {
            dispatch(logFetch(JSON.stringify(json, null, 2)))
            dispatch(retrivedBook(json))
            dispatch(endFetch())
        })
        .catch(err => {
            dispatch(errorFetch(err))
        })
}

export const postConfig = data => dispatch => {
    const baseUri = getBaseUri()

    dispatch(beginFetch())

    return fetch(`${baseUri}api/sys/`, {
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

export const fetchConfig = () => dispatch => {
    const baseUri = getBaseUri()

    dispatch(beginFetch())

    return fetch(`${baseUri}api/sys/`)
        .then(response => response.json())
        .then(json => {
            dispatch(logFetch(JSON.stringify(json, null, 2)))
            dispatch(retrivedConfig(json))
            dispatch(endFetch())
        })
        .catch(err => {
            dispatch(errorFetch(err))
        })
}

export const retrivedConfig = (config) => {
    return {
        type: types.CONFIG_RETRIVED,
        config
    }
}

export const changedConfig = (config) => {
    return {
        type: types.CONFIG_CHANGED,
        config
    }
}