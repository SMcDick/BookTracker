import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from "react-hot-loader";

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import thunk from 'redux-thunk'

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import Main from './Containers/Main'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import rootReducer from './Reducers/index'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, createLogger(), routerMiddleware(history))
)

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./Reducers', () => {
        store.replaceReducer(rootReducer)
    })
}

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => (
    <MuiThemeProvider>
        <Main isOpen={false} />
    </MuiThemeProvider>
);

render(
    <AppContainer>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    </AppContainer>
    ,document.getElementById('rootApp'))


if (module.hot) {
    module.hot.accept('./Containers/Main', () => {
        console.log('app.jsx HMR')

        const NewApp = require('./Containers/Main')
        render(
            <AppContainer>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <NewApp isOpen={false} />
                    </ConnectedRouter>
                </Provider>
            </AppContainer>,
            document.getElementById('rootApp')
        )
    })
}