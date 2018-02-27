import { RULE_CHANGE, RULE_RULE_REMOVED, RULE_ADDED, CONFIG_RETRIVED, CONFIG_POSTED, CONFIG_CHANGED } from '../ActionTypes'

const settingsReducer = (state = {}, action) => {
    const { config, type } = action
    switch (action.type) {
        case RULE_CHANGE:
            return {
                ...state,
                rule: action.rule
            }
        case RULE_RULE_REMOVED:
            return {
                ...state,
                ruleRemoved: action.rule
            }
        case RULE_ADDED:
            return {
                ...state,
                newRule: action.rule
            }
        case CONFIG_RETRIVED:
            return {
                ...state,
                config,
                posted: false
            }
        case CONFIG_POSTED:
            return {
                ...state,
                posted: true
            }
        case CONFIG_CHANGED:
            return {
                ...state,
                config
            }
        default:
            return state
    }
}

export default settingsReducer