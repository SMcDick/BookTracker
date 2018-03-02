import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import BookIcon from 'material-ui/svg-icons/action/book';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper';

import { closeSnack, toogleMenuAction } from '../Actions/commonActions'
import KeepaSettings from './KeepaSettings'
import Formulas from './Formulas'
import BookApp from './Books'
import SettingsApp from './Settings'

import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';

import { styles } from '../styles'

class Main extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        menuIsOpen: PropTypes.bool.isRequired,
        isFetching: PropTypes.bool.isRequired,
        snackMessage: PropTypes.string.isRequired,
        snackOpen: PropTypes.bool.isRequired,
        menuIsOpen: PropTypes.bool.isRequired,
        status: PropTypes.string,
        json: PropTypes.string,
        error: PropTypes.string,
        date: PropTypes.string
    }

    handleMenuToogle = () => {
        const { dispatch, menuIsOpen } = this.props
        dispatch(toogleMenuAction(!menuIsOpen))
    }

    handleMenuClose = () => {
        const { dispatch } = this.props
        dispatch(toogleMenuAction(false))
    }

    handleNavigationBooks = (event, menuItem, index) => {
        const { dispatch } = this.props

        dispatch(toogleMenuAction(false))
        dispatch(push(menuItem.props.value))
    }

    handleSnackClose = () => {
        const { dispatch } = this.props

        dispatch(closeSnack())
    }

    render() {
        const { menuIsOpen, isFetching, snackMessage, snackOpen, status, json, error, date } = this.props;
        const statusMsg = status ? `Status: ${status}` : 'Status: '

        const progressStyle = Object.assign({}, styles.indication, { visibility: isFetching ? 'visible' : 'collapse'})
        return (
            <Router>
                <div>
                    <AppBar title="Book Scouter"
                        onLeftIconButtonClick={this.handleMenuToogle} />

                    <Drawer open={menuIsOpen}
                        docked={false}
                        onRequestChange={this.handleMenuToogle}>
                        <Menu onItemClick={this.handleMenuClose}>
                            <MenuItem value="/" leftIcon={<BookIcon />}><Link to="/">Home</Link></MenuItem>
                            <MenuItem value="/settings" leftIcon={<ContentInbox />}><Link to="/settings">Settings</Link></MenuItem>
                            <MenuItem value="/keepaSettings" leftIcon={<ContentInbox />}><Link to="/keepaSettings">Keepa Settings</Link></MenuItem>
                            <MenuItem value="/formulas" leftIcon={<ContentInbox />}><Link to="/formulas">Formulas</Link></MenuItem>
                        </Menu>
                    </Drawer>

                    <Paper>
                        <CircularProgress style={progressStyle} />
                        <Switch>
                            <Route exact path="/">
                                <BookApp />
                            </Route>
                            <Route path="/pinnedBooks">
                                <span>Hello from books</span>
                            </Route>
                            <Route path="/settings">
                                <SettingsApp />
                            </Route>
                            <Route path="/keepaSettings">
                                <KeepaSettings />
                            </Route>
                            <Route path="/formulas">
                                <Formulas />
                            </Route>
                        </Switch>
                        
                    </Paper>
                    <Snackbar open={snackOpen} autoHideDuration={3000} onRequestClose={this.handleSnackClose.bind(this)} message={snackMessage} />
                </div>
            </Router>)
    }
}

const mapStateToProps = state => {
    const { errorMessageReducer, systemReducer, apiReducer } = state;
    const { isFetching, deep, json, error, date } = apiReducer
    const { snackMessage, snackOpen, menuIsOpen } = systemReducer
    return {
        menuIsOpen: menuIsOpen !== undefined ? menuIsOpen : false,
        status: isFetching ? 'Fetching' : error ? 'Error' : 'Ok',
        deep: deep ? deep : '',
        isFetching: isFetching !== undefined ? isFetching : false,
        snackMessage: snackMessage !== undefined ? snackMessage : '',
        snackOpen: snackOpen !== undefined ? snackOpen : false,
        json: json ? json : '',
        date: date ? date : '',
        error: error ? error : ''
    }
}

export default withRouter(connect(mapStateToProps)(Main))