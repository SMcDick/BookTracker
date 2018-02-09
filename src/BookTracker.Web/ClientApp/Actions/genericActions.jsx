import * as types from '../ActionTypes'

export const toogleMenuAction = (isOpen) => {
    return {
        type: types.MENU_TOOGLE,
        isOpen: isOpen
    }
}

export const addBookToSearch = (isbn) => {
    return {
        type: types.ADD_BOOK_SEARCH,
        book: isbn
    }
}

export const removeBookToSearch = (isbn) => {
    return {
        type: types.REMOVE_BOOK_SEARCH,
        book: isbn
    }
}