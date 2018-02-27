import React, { Component } from 'react';
import { TableRowColumn } from 'material-ui/Table'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

export default class SettingsRuleBox extends Component {
    static propTypes = {
        rule: PropTypes.object.isRequired,
        onRemove: PropTypes.func,
        onChange: PropTypes.func
    }

    onMinimumSalesRank = (evt, newValue) => {
        const minimumSalesRank = newValue ? parseFloat(newValue) : ''
        const { rule } = this.props
        const nRule = Object.assign({}, rule, {minimumSalesRank: minimumSalesRank})
        this.changeRule(nRule)
    }

    onMaximumSalesRank = (evt, newValue) => {
        const maximumSalesRank = newValue ? parseFloat(newValue) : ''
        const { rule } = this.props
        const nRule = Object.assign({}, rule, {maximumSalesRank: maximumSalesRank})
        this.changeRule(nRule)
    }

    onMininumNetPayout = (evt, newValue) => {
        const minimumNetPayout = newValue ? parseFloat(newValue) : ''
        const { rule } = this.props
        const nRule = Object.assign({}, rule, {minimumNetPayout: minimumNetPayout})
        this.changeRule(nRule)
    }

    changeRule = (rule) => {
        if (typeof this.props.onChange === 'function') {
            const { id } = this.props
            this.props.onChange(rule, id)
        }
    }

    onRemoveButtonClick = () => {
        if (typeof this.props.onRemove === 'function') {
            const { id, rule } = this.props
            this.props.onRemove(rule, id)
        }
    }

    render() {
        const { rule } = this.props
        const { minimumSalesRank, maximumSalesRank, minimumNetPayout } = rule
        return (
            <React.Fragment>
                <TableRowColumn><TextField hintText="minimum Sales Rank" type="number" required="required" onChange={this.onMinimumSalesRank} value={minimumSalesRank} /></TableRowColumn>
                <TableRowColumn>&lt; &gt;</TableRowColumn>
                <TableRowColumn><TextField hintText="maximum Sales Rank" type="number" required="required" onChange={this.onMaximumSalesRank} value={maximumSalesRank} /></TableRowColumn>
                <TableRowColumn><TextField hintText="minimum Net Payout" type="number" required="required" onChange={this.onMininumNetPayout} value={minimumNetPayout} /></TableRowColumn>
                <TableRowColumn><FlatButton label="Remove" primary={true} onClick={this.onRemoveButtonClick.bind(this)} /></TableRowColumn>
            </React.Fragment>
        )
    }
}