import * as types from '../ActionTypes'

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
    dispatch(beginFetch())
    const baseUri = window.location.href
    return fetch(`${baseUri}api/Book/${book}`)
        .then(response => response.json())
        .then(json => {
            dispatch(retrivedBook(json))
            dispatch(endFetch())
        })
}

export const ruleChange = (rule) => {
    return {
        type: types.RULE_CHANGE,
        rule
    }
}

export const ruleAdded = (rule) => {
    return {
        type: types.RULE_ADDED,
        rule
    }
}

export const ruleRemoved = (rule) => {
    return {
        type: types.RULE_REMOVED,
        rule
    }
}

export const postConfig = data => dispatch => {

}

export const getConfig = () => dispatch => {
    dispatch(beginFetch())
    const baseUri = window.location.href
    return fetch(`${baseUri}api/Book/${book}`)
        .then(response => response.json())
        .then(json => {
            dispatch(retrivedBook(json))
            dispatch(endFetch())
        })
}

