import { BOOK_SEARCH_ADD, BOOK_SEARCH_REMOVE, BOOK_SEARCH_RETRIVED, BOOK_SEARCH_NOT_FOUND, BOOK_SEARCH_CLEAR } from '../ActionTypes'

const book = (state = {}, action) => {
    const { isbnColl, bookColl } = state
    const { isbn, book, type } = action

    const safeBookColl = bookColl ? bookColl : []
    const safeIsbnColl = isbnColl ? isbnColl : []

    switch (type) {
        case BOOK_SEARCH_ADD:
            return {
                ...state,
                isbnColl: [{ isbn: isbn, fetched: false, displayMobile: false}].concat(safeIsbnColl)
            }
        case BOOK_SEARCH_REMOVE:
            const isbnCollReduced = safeIsbnColl.filter((item) => {
                return item.isbn !== isbn.isbn
            })
            
            const bookCollReduced = safeBookColl.filter((item) => {
                return item.isbn !== isbn.isbn
            })
            return {
                ...state,
                isbnColl: isbnCollReduced,
                bookColl: bookCollReduced
            }
        case BOOK_SEARCH_RETRIVED:
            const isbnList = safeIsbnColl.map((isbnBook, index) => {
                if(isbnBook.isbn == book.isbn) {
                    return Object.assign({}, isbnBook, { fetched: true, displayMobile: book.displayMobile })
                }
                else {
                    return isbnBook
                }
            })
            const bookList = isbnList.filter((elem, index) => {
                return elem.fetched
            })
            .map((elemBook, index) => {
                if(elemBook.isbn == book.isbn) {
                    return book
                }
                else {
                    return safeBookColl.find(bookInList => {
                        return bookInList.isbn == elemBook.isbn
                    })
                }
            })
            return {
                ...state,
                isbnColl: isbnList,
                bookColl: bookList,
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
                bookColl: [],
                isbnColl: []
            }
        default:
            return state
    }
}

const bookReducer = (state = {}, action) => {
    return book(state, action)
}

export default bookReducer