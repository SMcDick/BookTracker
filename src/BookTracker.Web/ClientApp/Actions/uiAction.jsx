import { UI_SELECTED_BOOK } from '../ActionTypes'

export const uiSelectedBook = (selectedIndex) => {
    return {
        type: UI_SELECTED_BOOK,
        selectedIndex
    }
}