import React, { Component } from 'react';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as actions from '../Actions/genericActions'
import { connect } from 'react-redux'

import ImageField from '../ui/ImageField'
import FlatTextField from '../ui/FlatTextField'
import FlatNumberField from '../ui/FlatNumberField'
import Responsive from '../ui/Responsive'

import Avatar from 'material-ui/Avatar';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import PropTypes from 'prop-types'

class SettingsActions extends Component {
    static propTypes = {
        onSaveClick: PropTypes.func.isRequired,
        onRefreshClick: PropTypes.func.isRequired
    }

    constructor() {
        super()
        this.handleSaveButtonClick.bind(this)
    }

    handleSaveButtonClick = () => {
        if (typeof this.props.onSaveClick === 'function') {
            this.props.onSaveClick()
        }
    }

    handleRefreshButtonClick = () => {
        if (typeof this.props.onRefreshClick === 'function') {
            this.props.onRefreshClick()
        }
    }

    render() {
        return (
            <div>
                <RaisedButton label="Save" primary={true} onClick={this.handleSaveButtonClick} />
                <RaisedButton label="Refresh" primary={false} onClick={this.handleRefreshButtonClick} />
            </div>
        )
    }
}

class SettingsBox extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        box: PropTypes.object.isRequired
    }

    constructor() {
        super()
        this.addRule.bind(this)
    }

    addRule = () => {

    }

    disableBox = () => {
        const { box, dispatch } = this.props
        dispatch()
    }

    render() {
        const { box, dispatch } = this.props
        const { rules } = box
        return (
            <React.Fragment>
                <FlatTextField source="name" record={box} />
                {
                    rules.map((r, index) => {
                        return (<SettingsRuleBox key={index} rule={r} dispatch={dispatch} />)
                    })
                }
            </React.Fragment>
        )
    }
}

class SettingsRuleBox extends Component {
    static propTypes = {
        rule: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    constructor() {
        super()
        this.state = { minSalesRank: '', maxSalesRank: '', minNetPayout: '' }
    }

    onMinimumSalesRank = (evt, newValue) => {
        const { rule } = this.props
        let nRule = rule
        nRule.minNetPayout = newValue
        refresh(nRule)
    }

    onMaximumSalesRank = (evt, newValue) => {
        const { rule } = this.props
        let nRule = rule
        nRule.maximumSalesRank = newValue
        refresh(nRule)
    }

    onMininumNetPayout = (evt, newValue) => {
        const { rule } = this.props
        let nRule = rule
        nRule.minimumNetPayout = newValue
        refresh(nRule)
    }

    refresh = (rule) => {
        const { dispatch } = this.props
        const action = ruleChange(rule)
        dispatch(action)
    }

    onRemoveRule = () => {
        const { rule, dispatch } = this.props
        const action = ruleRemoved(rule)
        dispatch(action)
    }

    render() {
        const defaultValue = 0
        const { minimumSalesRank, maximumSalesRank, minimumNetPayout } = this.props
        return (
            <Card>
                <CardText>
                    <TextField hintText="min Sales Rank" defaultValue={defaultValue} onChange={this.onMinimumSalesRank} value={minimumSalesRank} />
                    =
                    <TextField hintText="max Sales Rank" defaultValue={defaultValue} onChange={this.onMaximumSalesRank} value={maximumSalesRank} />
                    <TextField hintText="min Net Payout" defaultValue={defaultValue} onChange={this.onMininumNetPayout} value={minimumNetPayout} />
                    <RaisedButton label="X" primary={true} onClick={this.onRemoveRule} />
                </CardText>
            </Card>
        )
    }
}

class SettingsApp extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        boxes: PropTypes.array.isRequired
    }

    constructor() {
        super()
        this.onRefreshClick.bind(this)
        this.onSaveClick.bind(this)
    }

    onRefreshClick = () => {

    }

    onSaveClick = () => {

    }

    loadData = () => {

    }

    render() {
        const { boxes, dispatch } = this.props
        return (
            <Card>
                <CardHeader title="Book Scouter App" />
                <CardText>
                    <SettingsActions onSaveClick={this.onSaveClick} onRefreshClick={this.onRefreshClick} />
                    {
                        boxes.map((m, index) => {
                            <SettingsBox key={index} box={m} dispatch={dispatch} />
                        })
                    }
                </CardText>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    const rule = {
        minimumSalesRank: 0,
        maximumSalesRank: 10,
        minimumNetPayout: 3
    }
    const boxes = [{
        rules: [rule]
    }]
    return {
        boxes
    }
}

export default connect(mapStateToProps)(SettingsApp)