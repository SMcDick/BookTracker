import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import SettingsCurrency from './SettingsCurrency'
import SettingsSoundColor from './SettingsSoundColor'
import SettingsRuleBox from './SettingsRuleBox'
import { styles } from '../styles'
import PropTypes from 'prop-types'

export default class SettingsBox extends Component {
    static propTypes = {
        box: PropTypes.object,
        onBoxChanged: PropTypes.func,
        onBoxDisabled: PropTypes.func
    }

    handleAddRuleClick = () => {
        const { box } = this.props

        const nBox = Object.assign({}, box, { rules : box.rules.concat([{ minimumSalesRank: 0, maximumSalesRank: 0, minimumNetPayout: 0 }]) })

        this.boxChanged(nBox)
    }

    handleToggleBoxClick(evt, isChecked) {
        if (typeof this.props.onBoxDisabled === 'function') {
            const { box, id } = this.props
            this.props.onBoxDisabled(box, id, isChecked)
        }
    }

    handleRemoveRule = (rule, key) => {
        const { box } = this.props

        const nRules = box.rules.filter((elem, index) => {
            return index != key
        })

        const nBox = Object.assign({}, box, { rules: nRules })

        this.boxChanged(nBox)
    }

    boxChanged = (box) => {
        if (typeof this.props.onBoxChanged === 'function') {
            const { id } = this.props
            this.props.onBoxChanged(box, id)
        }
    }

    onRuleChanged = (rule, key) => {
        const { box } = this.props

        let nBox = Object.assign({}, box)
        nBox.rules[key] = rule

        this.boxChanged(nBox)
    }

    onColorChange(newValue) {
        const { box } = this.props
        const nBox = Object.assign(box, { color: newValue })
        this.boxChanged(nBox)
    }

    onSoundChange(newValue) {
        const { box } = this.props
        const nBox = Object.assign({}, box, { soundPath: newValue })
        this.boxChanged(nBox)
    }

    onCurrencyChange(newValue) {
        const { box } = this.props
        const nBox = Object.assign({}, box, { currencyRate: newValue })
        this.boxChanged(nBox)
    }

    render() {
        const { box, dispatch } = this.props
        if (box !== undefined) {
            const { rules, name, enabled, soundPath, color, currencyRate, currencyName } = box
            const text = enabled ? 'Enabled' : 'Disabled'
            return (
                <React.Fragment>
                    <Card>
                        <CardHeader
                            title={name}
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardActions expandable={true}>
                            <RaisedButton label="Add Rule" primary={true} onClick={this.handleAddRuleClick.bind(this)} style={styles.button} />
                            <Toggle label={text} labelPosition="right" style={styles.toggle} onToggle={this.handleToggleBoxClick.bind(this)} toggled={enabled} />
                        </CardActions>
                        <CardText expandable={true}>
                            <Table>
                                <TableHeader adjustForCheckbox={styles.table.displaySelectAll} displaySelectAll={styles.table.displaySelectAll}>
                                    <TableRow>
                                        <TableHeaderColumn>minimum sales rank</TableHeaderColumn>
                                        <TableHeaderColumn>value betwin</TableHeaderColumn>
                                        <TableHeaderColumn>maximum sales rank</TableHeaderColumn>
                                        <TableHeaderColumn>minimum net payout</TableHeaderColumn>
                                        <TableHeaderColumn></TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={styles.table.displaySelectAll}>
                                    {
                                        rules.map((r, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <SettingsRuleBox id={index} rule={r} onRemove={this.handleRemoveRule.bind(this)} onChange={this.onRuleChanged} />
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                            <SettingsCurrency onCurrencyChange={this.onCurrencyChange.bind(this)} currencyName={currencyName} currencyRate={currencyRate} />
                            <SettingsSoundColor sound={soundPath} color={color} onColorChange={this.onColorChange.bind(this)} onSoundChange={this.onSoundChange.bind(this)} />
                        </CardText>
                    </Card>
                </React.Fragment>
            )
        }
        else {
            return <span></span>
        }

    }
}