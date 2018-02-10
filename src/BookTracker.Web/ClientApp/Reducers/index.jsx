﻿import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import * as types from '../ActionTypes'

const api = (state = {}, action) => {
    const { deep } = state
    switch (action.type) {
        case types.API_REQUEST_BEGIN:
            const nDeepBegin = deep + 1
            return {
                ...state,
                deep: nDeepBegin,
                isFetching: true,
            }
        case types.API_REQUEST_END:
            const nDeep = deep - 1
            return {
                ...state,
                isFetching: nDeep > 0,
                deep: nDeep
            }
        case types.API_REQUEST_ERROR:
            return {
                ...state,
                isFetching: false
            }
        default:
            return state
    }
}

const apiReducer = (state = {}, action) => {
    return api(state, action)
}

const systemReducer = (state = {}, action) => {
    switch (action.type) {
        case types.SNACKBAR_OPEN:
            const { text, time } = action
            return {
                ...state,
                text,
                isOpen: true
            }
        case types.SNACKBAR_CLOSE:
            return {
                ...state,
                isOpen: false
            }
        default:
            return state
    }
}

const menuHandleReducer = (state = {}, action) => {
    switch (action.type) {
        case types.MENU_TOOGLE:
            return {
                ...state,
                isOpen: action.isOpen
            }
        default:
            return state
    }
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

const book = (state = {}, action) => {
    const { isbnColl, bookColl } = state
    const { isbn, book, type } = action

    switch (type) {
        case types.BOOK_SEARCH_ADD:
            let nIsbnColl = isbnColl ? isbnColl : []
            nIsbnColl = nIsbnColl.concat(isbn)
            return {
                ...state,
                isbnColl: nIsbnColl
            }
        case types.BOOK_SEARCH_REMOVE:
            let isbnCollReduced = isbnColl.filter((item) => {
                return item !== isbn
            })
            const nBookCollRM = bookColl ? bookColl : []
            let bookCollReduced = nBookCollRM.filter((item) => {
                return item.isbn !== isbn
            })
            return {
                ...state,
                isbnColl: isbnCollReduced,
                bookColl: bookCollReduced
            }
        case types.BOOK_SEARCH_RETRIVED:
            let nBookColl = bookColl ? bookColl : []
            nBookColl = nBookColl.concat(book)
            return {
                ...state,
                bookColl: nBookColl
            }
        case types.BOOK_SEARCH_NOT_FOUND:
            
            return {
                ...state,
                notfound: `Book ${isbn} not found`
            }
        case types.BOOK_SEARCH_CLEAR:
            return {
                ...state,
                bookColl: []
            }
        default:
            return state
    }
}

const bookReducer = (state = {}, action) => {
    return book(state, action)
}

const rootReducer = combineReducers({
    apiReducer,
    errorMessageReducer,
    menuHandleReducer,
    routerReducer,
    bookReducer,
    systemReducer
})

export default rootReducer