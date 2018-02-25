import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { withRouter } from 'react-router-dom'

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import BookIcon from 'material-ui/svg-icons/action/book';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import * as actions from '../Actions'
import ApiSettingsApp from './ApiSettings'
import BookApp from './Books'
import SettingsApp from './Settings'
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
    json: {
        whiteSpace: 'pre-wrap'
    },
    indication: {
        top: '12%',
        left: '45%',
        z_index: '1',
        position: 'absolute'
    }
};

class Main extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isOpen: PropTypes.bool
    }

    handleMenuToogle = () => {
        const { dispatch, isOpen } = this.props
        dispatch(actions.toogleMenuAction(!isOpen))
    }

    handleMenuClose = () => {
        const { dispatch } = this.props
        dispatch(actions.toogleMenuAction(false))
    }

    handleNavigationBooks = (event, menuItem, index) => {
        const { dispatch } = this.props

        dispatch(actions.toogleMenuAction(false))
        dispatch(push(menuItem.props.value))
    }

    handleSnackClose = () => {
        const { dispatch } = this.props

        dispatch(actions.closeSnack())
    }

    render() {
        const { isOpen, snackIsOpen, snackText, snackTime, status, json, error, date } = this.props;
        const statusMsg = status ? `Status: ${status}` : 'Status: '

        const progressStyle = Object.assign({}, styles.indication, { visibility: snackIsOpen ? 'visible' : 'collapse'})
        return (
            <Router>
                <div>
                    <AppBar title="Book Scouter"
                        onLeftIconButtonClick={this.handleMenuToogle} />

                    <Drawer open={isOpen}
                        docked={false}
                        onRequestChange={this.handleMenuToogle}>
                        <Menu onItemClick={this.handleMenuClose}>
                            <MenuItem value="/" leftIcon={<BookIcon />}><Link to="/">Home</Link></MenuItem>
                            <MenuItem value="/settings" leftIcon={<ContentInbox />}><Link to="/settings">Settings</Link></MenuItem>
                            <MenuItem value="/settings" leftIcon={<ContentInbox />}><Link to="/apisettings">Api Settings</Link></MenuItem>
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
                            <Route path="/apisettings">
                                <ApiSettingsApp />
                            </Route>
                        </Switch>
                        <Card>
                            <CardHeader
                                title={statusMsg}
                                actAsExpander={true}
                                showExpandableButton={true}
                            />
                            <CardText expandable={true}>
                                <div>
                                    <div>error msg: '{error}'</div>
                                </div>
                                <div>last update: {date}</div>
                                <div>
                                    <div style={styles.json}>api data: {json}</div>
                                </div>
                            </CardText>
                        </Card>
                    </Paper>
                    <Snackbar open={false}
                        message={snackText} />
                </div>
            </Router>)
    }
}

const mapStateToProps = state => {
    const { menuHandleReducer, errorMessageReducer, systemReducer, apiReducer } = state;
    const { isFetching, deep, json, error, date } = apiReducer

    return {
        isOpen: menuHandleReducer.isOpen,
        status: isFetching ? 'Fetching' : error ? 'Error' : 'Ok',
        deep: deep ? deep : '',
        snackIsOpen: isFetching !== undefined ? isFetching : false,
        snackText: 'Fetching',
        json: json ? json : '',
        date: date ? date : '',
        error: error ? error : ''
    }
}

export default withRouter(connect(mapStateToProps)(Main))