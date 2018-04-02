import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import formulaReducer from './formulaReducers'
import keepaReducer from './keepaReducer'
import { systemReducer, apiReducer, errorMessageReducer } from './systemReducer'
import settingsReducer from './settingsReducer'
import bookReducer from './bookReducer'
import uiReducer from './uiReducer'

const rootReducer = combineReducers({
    apiReducer,
    errorMessageReducer,
    routerReducer,
    bookReducer,
    settingsReducer,
    keepaReducer,
    formulaReducer,
    systemReducer,
    uiReducer
})

export default rootReducer