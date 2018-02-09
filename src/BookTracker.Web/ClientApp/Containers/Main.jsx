import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { withRouter } from 'react-router-dom'

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import * as actions from '../Actions/genericActions'


class Main extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired
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

    render() {
        const { isOpen } = this.props;
        return (
            <Router>
                <div>
                    <AppBar title="My AppBar"
                        onLeftIconButtonClick={this.handleMenuToogle} />

                    <Drawer open={isOpen}
                        docked={false}
                        onRequestChange={this.handleMenuToogle}>
                        <Menu onItemClick={this.handleMenuClose}>
                            <MenuItem value="/" leftIcon={<ContentInbox />}><Link to="/">Home</Link></MenuItem>
                            <MenuItem value="/settings" leftIcon={<ContentInbox />}><Link to="/settings">Settings</Link></MenuItem>
                            <Divider />
                            <MenuItem value="/pinnedBooks" leftIcon={<ContentInbox />}><Link to="/pinned">Pinned Books</Link></MenuItem>
                        </Menu>
                    </Drawer>

                    <Paper>
                        <Switch>
                            <Route exact path="/">
                                <span>Hello from home</span>
                            </Route>
                            <Route path="/pinnedBooks">
                                <span>Hello from books</span>
                            </Route>
                            <Route path="/settings">
                                <span>Hello from settings</span>
                            </Route>
                        </Switch>
                        <Card>
                            <CardText>
                                Status: {this.props.status}
                            </CardText>
                        </Card>
                    </Paper>
                </div>
            </Router>)
    }
}

const mapStateToProps = state => {
    const { menuHandleReducer, errorMessageReducer, systemReducer } = state;
    return {
        isOpen: menuHandleReducer.isOpen,
        status: systemReducer.status
    }
}

export default withRouter(connect(mapStateToProps)(Main))