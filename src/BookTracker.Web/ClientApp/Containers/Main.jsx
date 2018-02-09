import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    BrowserRouter as Router, Route, Switch
} from 'react-router-dom'

export const Main = ({ status }) => {
    return (
        <Router>
            <div>
                <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a href="javascript:void(0);" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a>
                            <a href="javascript:void(0);" className="bars"></a>
                            <a className="navbar-brand" href="/"><i className="fa fa-cubes"></i> App</a>
                        </div>
                    </div>
                </nav>
                <section className="content">
                    <div className="container-fluid">
                        <Switch>
                            <Route path="/home/:id">
                                <span>Hello from home</span>
                            </Route>
                            <Route path="/">
                                <span>Hello from /</span>
                            </Route>
                        </Switch>

                        <div>status: {status}</div>
                    </div>
                </section>
            </div>
        </Router>)
}

Main.PropTypes = {
    status: PropTypes.string
}

const mapStateToProps = state => ({
    errorMessage: state.errorMessage
})

export default connect(mapStateToProps)(Main)