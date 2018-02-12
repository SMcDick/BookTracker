import React, { Component } from 'react';

import { List, ListItem } from 'material-ui/List';
import Toggle from 'material-ui/Toggle';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper';

import * as actions from '../Actions'
import { connect } from 'react-redux'

import ImageField from '../ui/ImageField'
import FlatTextField from '../ui/FlatTextField'
import FlatNumberField from '../ui/FlatNumberField'
import Responsive from '../ui/Responsive'

import Avatar from 'material-ui/Avatar';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import PropTypes from 'prop-types'

const styles = {
    button: {
        marginRight: 12,
        marginBottom: 12
    },
    table: {
        displaySelectAll: false
    },
    toggle: {
        margin: 16,
    },
    paper: {
        margin: 20,
        textAlign: 'center',
        display: 'inline-block'
    },
    soundColorText: {
        margin: 20
    }
};

const colorsDatasource = [
    { key: '', value: '' },
    { key: 'Red', value: '#FFCDD2' },
    //{ key: 'Pink', value: '#F8BBD0' },
    //{ key: 'Purple', value: '#E1BEE7' },
    { key: 'Blue', value: '#BBDEFB' },
    //{ key: 'Indigo', value: '#C5CAE9' },
    //{ key: 'Deep Purple', value: '#D1C4E9' },
    { key: 'Teal', value: '#B2DFDB' },
    { key: 'Cyan', value: '#B2EBF2' },
    //{ key: 'Light Blue', value: '#B3E5FC' },
    { key: 'Green', value: '#C8E6C9' },
    //{ key: 'Lime', value: '#F0F4C3' },
    { key: 'Yellow', value: '#FFF9C4' },
    { key: 'Orange', value: '#FFE0B2' }
];
const colorDataSourceConfig = {
    text: 'key',
    value: 'value',
};

const soundDatasource = [
    { key: '', value: '' },
    { key: 'Sound 1', value: '1.mp3' },
    { key: 'Sound 2', value: '2.mp3' },
    { key: 'Sound 3', value: '3.mp3' },
    { key: 'Sound 4', value: '4.mp3' },
    { key: 'Sound 5', value: '5.mp3' }
];
const soundDataSourceConfig = {
    text: 'key',
    value: 'value',
};

class SettingsActions extends Component {
    static propTypes = {
        onSaveClick: PropTypes.func.isRequired,
        onRefreshClick: PropTypes.func.isRequired,
        onDisplayRejected: PropTypes.func,
        displayRejected: PropTypes.bool.isRequired
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

    handleToggleBoxClick(evt, isChecked) {
        if (typeof this.props.onDisplayRejected === 'function') {
            this.props.onDisplayRejected(isChecked)
        }
    }

    render() {
        const { displayRejected } = this.props
        const text = displayRejected ? 'Display as row' : 'Display as rejected'
        return (
            <div>
                <RaisedButton label="Save" primary={true} onClick={this.handleSaveButtonClick.bind(this)} style={styles.button} />
                <RaisedButton label="Refresh" primary={false} onClick={this.handleRefreshButtonClick.bind(this)} style={styles.button} />
                <Toggle label={text} labelPosition="right" style={styles.toggle} onToggle={this.handleToggleBoxClick.bind(this)} toggled={displayRejected} />
            </div>
        )
    }
}

class SettingsBox extends Component {
    static propTypes = {
        box: PropTypes.object,
        onBoxChanged: PropTypes.func,
        onBoxDisabled: PropTypes.func
    }

    handleAddRuleClick = () => {
        const { box } = this.props

        let nBox = Object.assign({}, box)
        nBox.rules.push({ minimumSalesRank: 0, maximumSalesRank: 0, minimumNetPayout: 0 })

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

        let nBox = Object.assign({}, box)
        nBox.rules = box.rules.filter((elem, index) => {
            return index != key
        })

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
        const nBox = Object.assign(box, { soundPath: newValue })
        this.boxChanged(nBox)
    }

    onCurrencyChange(newValue) {
        const { box } = this.props
        const nBox = Object.assign(box, { currencyRate: newValue })
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

class SettingsBoxSimple extends Component {
    static propTypes = {
        box: PropTypes.object,
        onBoxChanged: PropTypes.func,
        onBoxDisabled: PropTypes.func
    }

    handleToggleBoxClick(evt, isChecked) {
        if (typeof this.props.onBoxDisabled === 'function') {
            const { box, id } = this.props
            this.props.onBoxDisabled(box, id, isChecked)
        }
    }

    boxChanged = (box) => {
        if (typeof this.props.onBoxChanged === 'function') {
            const { id } = this.props
            this.props.onBoxChanged(box, id)
        }
    }

    onOfferChanged = (evt, newValue) => {
        const { box } = this.props

        const nBox = Object.assign(box, { offerGreaterThan: newValue ? parseInt(newValue, 10) : '' })

        this.boxChanged(nBox)
    }

    onSoundChange(newValue) {
        const { box } = this.props
        const nBox = Object.assign(box, { soundPath: newValue })
        this.boxChanged(nBox)
    }

    onColorChange(newValue) {
        const { box } = this.props
        const nBox = Object.assign(box, { color: newValue })
        this.boxChanged(nBox)
    }

    render() {
        const { box, dispatch } = this.props
        if (box !== undefined) {
            const { rules, name, enabled, soundPath, color, offerGreaterThan } = box
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
                            <Toggle label={text} labelPosition="right" style={styles.toggle} onToggle={this.handleToggleBoxClick.bind(this)} toggled={enabled} />
                        </CardActions>
                        <CardText expandable={true}>
                            <TextField floatingLabelText="offer greater than" onChange={this.onOfferChanged.bind(this)} value={offerGreaterThan} style={styles.soundColorText} />
                            <SettingsSoundColor sound={soundPath} color={color} onSoundChange={this.onSoundChange.bind(this)} onColorChange={this.onColorChange.bind(this)} />
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

class SettingsSoundColor extends Component {
    static propTypes = {
        onColorChange: PropTypes.func,
        onSoundChange: PropTypes.func,
        color: PropTypes.string.isRequired,
        sound: PropTypes.string.isRequired
    }

    handleColorChange(event, index, value) {
        if (typeof this.props.onColorChange === 'function') {
            this.props.onColorChange(value)
        }
    }

    handleSoundAutoCompleteChange(event, index, value) {
        if (typeof this.props.onSoundChange === 'function') {
            this.props.onSoundChange(value)
        }
    }

    render() {
        const { color, sound } = this.props
        return (
            <div>
                <SelectField
                    floatingLabelText="Sound"
                    value={sound}
                    onChange={this.handleSoundAutoCompleteChange.bind(this)}>
                    {
                        soundDatasource.map((e, i) => {
                            return <MenuItem key={i} value={e.value} primaryText={e.key} />
                        })
                    }
                </SelectField>
                <SelectField
                    floatingLabelText="Color"
                    value={color}
                    onChange={this.handleColorChange.bind(this)}>
                    {
                        colorsDatasource.map((e, i) => {
                            return <MenuItem key={i} value={e.value} primaryText={e.key} />
                        })
                    }
                </SelectField>
            </div>
        )
    }
}

class SettingsCurrency extends Component {
    static propTypes = {
        onCurrencyChange: PropTypes.func,
        currencyRate: PropTypes.number.isRequired,
        currencyName: PropTypes.string.isRequired
    }

    handleCurrencyChange(event, newValue) {
        if (typeof this.props.onCurrencyChange === 'function') {
            const sVal = newValue !== '' ? newValue.replace(/\$(-?\d+.\d{2})/, "$1") : '0'
            const val = parseFloat(sVal)
            this.props.onCurrencyChange(val)
        }
    }

    render() {
        const { currencyRate, currencyName } = this.props
        const displayCurrency = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currencyRate))
        const label = `Currency ${currencyName}`
        return (
            <div>
                <TextField floatingLabelText={label} value="$1.00" disabled={true} />
                <TextField floatingLabelText="US Dollar" value={displayCurrency} onChange={this.handleCurrencyChange.bind(this)} />
            </div>
        )
    }
}

class SettingsRuleBox extends Component {
    static propTypes = {
        rule: PropTypes.object.isRequired,
        onRemove: PropTypes.func,
        onChange: PropTypes.func
    }

    constructor() {
        super()

        this.onMinimumSalesRank.bind(this)
        this.onMaximumSalesRank.bind(this)
        this.onMininumNetPayout.bind(this)
    }

    onMinimumSalesRank = (evt, newValue) => {
        const { rule } = this.props
        let nRule = rule
        nRule.minimumSalesRank = newValue ? parseInt(newValue, 10) : ''
        this.changeRule(nRule)
    }

    onMaximumSalesRank = (evt, newValue) => {
        const { rule } = this.props
        let nRule = rule
        nRule.maximumSalesRank = newValue ? parseInt(newValue, 10) : ''
        this.changeRule(nRule)
    }

    onMininumNetPayout = (evt, newValue) => {
        const { rule } = this.props
        let nRule = rule
        nRule.minimumNetPayout = newValue ? parseInt(newValue, 10) : ''
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
                <TableRowColumn><TextField hintText="minimum Sales Rank" onChange={this.onMinimumSalesRank} value={minimumSalesRank} /></TableRowColumn>
                <TableRowColumn>&lt; &gt;</TableRowColumn>
                <TableRowColumn><TextField hintText="maximum Sales Rank" onChange={this.onMaximumSalesRank} value={maximumSalesRank} /></TableRowColumn>
                <TableRowColumn><TextField hintText="minimum Net Payout" onChange={this.onMininumNetPayout} value={minimumNetPayout} /></TableRowColumn>
                <TableRowColumn><FlatButton label="Remove" primary={true} onClick={this.onRemoveButtonClick.bind(this)} /></TableRowColumn>
            </React.Fragment>
        )
    }
}

class SettingsApp extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        boxes: PropTypes.object.isRequired
    }

    constructor() {
        super()
    }

    componentWillMount() {
        this.refreshData()
    }

    componentDidMount() {
    }

    onRefreshClick = () => {
        this.refreshData()
    }

    onResetClick() {
        this.refreshData()
    }

    refreshData() {
        const { dispatch } = this.props
        dispatch(actions.fetchConfig())
    }

    onSaveClick() {
        const { dispatch, boxes } = this.props
        dispatch(actions.postConfig(boxes))
    }

    onBoxChanged(box, key) {
        const { boxes, dispatch } = this.props
        let nConfig = Object.assign({}, boxes)

        nConfig[`box${key}`] = box

        dispatch(actions.changedConfig(nConfig))
    }

    onBoxDisabled(box, key, enabled) {
        const { boxes, dispatch } = this.props
        let nConfig = Object.assign({}, boxes)

        nConfig[`box${key}`].enabled = enabled

        dispatch(actions.changedConfig(nConfig))
    }

    onDisplayRejected(enabled) {
        const { boxes, dispatch } = this.props
        let nConfig = Object.assign({}, boxes)

        nConfig.displayRejected = enabled

        dispatch(actions.changedConfig(nConfig))
    }

    render() {
        const { dispatch, boxes } = this.props
        
        if (boxes !== undefined && boxes.box1 !== undefined) {
            const { box1, box2, box3, box4, box5, displayRejected } = boxes
            return (
                <Card>
                    <CardHeader title="Settings" />
                    <CardText>
                        <SettingsActions onSaveClick={this.onSaveClick.bind(this)}
                            onRefreshClick={this.onRefreshClick.bind(this)}
                            onResetClick={this.onResetClick.bind(this)}
                            onDisplayRejected={this.onDisplayRejected.bind(this)}
                            displayRejected={displayRejected} />

                        <SettingsBox id="1" box={box1} onBoxChanged={this.onBoxChanged.bind(this)} onBoxDisabled={this.onBoxDisabled.bind(this)} />
                        <SettingsBoxSimple id="2" box={box2} onBoxChanged={this.onBoxChanged.bind(this)} onBoxDisabled={this.onBoxDisabled.bind(this)} />
                        <SettingsBox id="3" box={box3} onBoxChanged={this.onBoxChanged.bind(this)} onBoxDisabled={this.onBoxDisabled.bind(this)} />
                        <SettingsBox id="4" box={box4} onBoxChanged={this.onBoxChanged.bind(this)} onBoxDisabled={this.onBoxDisabled.bind(this)} />
                        <SettingsBox id="5" box={box5} onBoxChanged={this.onBoxChanged.bind(this)} onBoxDisabled={this.onBoxDisabled.bind(this)} />
                    </CardText>
                </Card>
            )
        }
        else {
            return <div />
        }
    }
}

const mapStateToProps = state => {
    const { settingsReducer } = state
    const { config, posted } = settingsReducer

    const boxes = config
    return {
        boxes: boxes ? boxes : {},
        posted: posted !== undefined ? posted : false
    }
}

export default connect(mapStateToProps)(SettingsApp)