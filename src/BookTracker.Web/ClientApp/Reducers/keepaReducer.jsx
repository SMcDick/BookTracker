import { API_CONFIG_RETRIVED, API_CONFIG_CHANGED, API_CONFIG_POSTED } from '../ActionTypes'

const keepaReducer = (state = {}, action) => {
    const { settings } = action
    switch (action.type) {
        case API_CONFIG_RETRIVED:
        case API_CONFIG_CHANGED:
            return {
                ...state,
                settings
            }
        case API_CONFIG_POSTED:

        default:
            return state
    }
}

export default keepaReducer