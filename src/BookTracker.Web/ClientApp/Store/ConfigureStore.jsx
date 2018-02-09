import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from '../Reducers/index'


const ConfigureStore = () => {
    const store = createStore(
        rootReducer,
        applyMiddleware(thunk, createLogger())
    )

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../Reducers', () => {
            store.replaceReducer(rootReducer)
        })
    }

    return store
}

export default ConfigureStore;