import React, { Component } from 'react';

import { connect } from 'react-redux'

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import PropTypes from 'prop-types'


class SettingsApp extends Component {
    render() {
        return <span>Settings App</span>
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps)(SettingsApp)