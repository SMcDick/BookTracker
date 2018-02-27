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
import KeepaSettings from './KeepaSettings'
import Formulas from './Formulas'
import BookApp from './Books'
import SettingsApp from './Settings'
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';
import ScanApp from './ScanApp'

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
        dispatch(actions.toogleMenuAction(!menuIsOpen))
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
                            <MenuItem value="/scan" leftIcon={<ContentInbox />}><Link to="/scan">Scan</Link></MenuItem>
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
                            <Route path="/scan">
                                <ScanApp />
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
                    <Snackbar open={snackOpen} autoHideDuration={3000} message={snackMessage} />
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