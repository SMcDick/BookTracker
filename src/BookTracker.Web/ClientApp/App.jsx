import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from "react-hot-loader";

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import Main from './Containers/Main'
import ConfigureStore from './Store/ConfigureStore'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()
const store = ConfigureStore()

render(
    <AppContainer>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Main />
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
                        <NewApp />
                    </ConnectedRouter>
                </Provider>
            </AppContainer>,
            document.getElementById('rootApp')
        )
    })
}