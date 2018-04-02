import { UI_SELECTED_BOOK } from '../ActionTypes'

const uiReducer = (state = {}, action) => {
    const { type, selectedIndex } = action
    switch (type) {
        case UI_SELECTED_BOOK:
            return {
                ...state,
                selectedIndex
            }
        default:
            return {
                ...state
            }
    }
}

export default uiReducer