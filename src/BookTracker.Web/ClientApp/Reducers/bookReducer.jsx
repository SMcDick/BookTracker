import { BOOK_SEARCH_ADD, BOOK_SEARCH_REMOVE, BOOK_SEARCH_RETRIVED, BOOK_SEARCH_NOT_FOUND, BOOK_SEARCH_CLEAR } from '../ActionTypes'

const book = (state = {}, action) => {
    const { isbnColl, bookColl } = state
    const { isbn, book, type } = action

    switch (type) {
        case BOOK_SEARCH_ADD:
            let nIsbnColl = isbnColl ? isbnColl : []
            nIsbnColl = nIsbnColl.concat(isbn)
            return {
                ...state,
                isbnColl: nIsbnColl
            }
        case BOOK_SEARCH_REMOVE:
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
        case BOOK_SEARCH_RETRIVED:
            let nBookColl = bookColl ? bookColl : []
            nBookColl = nBookColl.concat(book)
            return {
                ...state,
                bookColl: nBookColl,
                lastBook: book
            }
        case BOOK_SEARCH_NOT_FOUND:

            return {
                ...state,
                notfound: `Book ${isbn} not found`
            }
        case BOOK_SEARCH_CLEAR:
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

export default bookReducer