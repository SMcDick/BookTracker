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
import Paper from 'material-ui/Paper';

import * as actions from '../Actions'
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
                <RaisedButton label="Save" primary={true} onClick={this.handleSaveButtonClick.bind(this)} style={styles.button} />
                <RaisedButton label="Refresh" primary={false} onClick={this.handleRefreshButtonClick.bind(this)} style={styles.button} />
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

    render() {
        const { box, dispatch } = this.props
        if (box !== undefined) {
            const { rules, name, enabled, soundPath, color } = box
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

    onRuleChanged = (rule, key) => {
        const { box } = this.props

        let nBox = Object.assign({}, box)
        nBox.rules[key] = rule

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
            const { rules, name, enabled, soundPath, color } = box
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

    handleColorChange(evt, newValue) {
        if (typeof this.props.onColorChange === 'function') {
            this.props.onColorChange(newValue)
        }
    }

    handleSoundChange(evt, newValue) {
        if (typeof this.props.onSoundChange === 'function') {
            this.props.onSoundChange(newValue)
        }
    }

    render() {
        const { color, sound } = this.props
        return (
            <div>
                <TextField hintText="" floatingLabelText="Sound" value={sound} onChange={this.handleSoundChange.bind(this)} style={styles.soundColorText} />
                <TextField hintText="" floatingLabelText="Color" value={color} onChange={this.handleColorChange.bind(this)} style={styles.soundColorText} />
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

    render() {
        const { dispatch, boxes } = this.props
        const { box1, box2, box3, box4, box5 } = boxes
        return (
            <Card>
                <CardHeader title="Settings" />
                <CardText>
                    <SettingsActions onSaveClick={this.onSaveClick.bind(this)} onRefreshClick={this.onRefreshClick.bind(this)} onResetClick={this.onResetClick.bind(this)} />
                    <SettingsBox id="1" box={box1} onBoxChanged={this.onBoxChanged.bind(this)} onBoxDisabled={this.onBoxDisabled.bind(this)} />
                    <SettingsBoxSimple id="2" box={box2} onBoxChanged={this.onBoxChanged.bind(this)} onBoxDisabled={this.onBoxDisabled.bind(this)} />
                    <SettingsBox id="3" box={box3} onBoxChanged={this.onBoxChanged.bind(this)} onBoxDisabled={this.onBoxDisabled.bind(this)} />
                    <SettingsBox id="4" box={box4} onBoxChanged={this.onBoxChanged.bind(this)} onBoxDisabled={this.onBoxDisabled.bind(this)} />
                    <SettingsBox id="5" box={box5} onBoxChanged={this.onBoxChanged.bind(this)} onBoxDisabled={this.onBoxDisabled.bind(this)} />
                </CardText>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    const { settingsReducer } = state
    const { config, posted } = settingsReducer

    const boxes = config
    return {
        boxes: boxes !== undefined ? boxes : {},
        posted: posted !== undefined ? posted : false
    }
}

export default connect(mapStateToProps)(SettingsApp)