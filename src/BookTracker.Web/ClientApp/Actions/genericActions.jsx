import * as types from '../ActionTypes'

export const toogleMenuAction = (isOpen) => {
    return {
        type: types.MENU_TOOGLE,
        isOpen: isOpen
    }
}