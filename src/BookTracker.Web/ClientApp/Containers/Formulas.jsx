import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper';

import CommonActions, { SaveAction, RefreshAction } from '../Components/CommonActions'
import { saveFormulaAction, loadFormulaAction, changedFormulaAction } from '../Actions/formulaActions'

const styles = {
    button: {
        marginRight: 12,
        marginBottom: 12
    },
    textbox: {
        marginLeft: 20
    },
    formulaInfo: {
        height: 40,
        paddingTop: 25,
        paddingLeft: 10
    }
};

class FormulasApp extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        settings: PropTypes.shape({
            variables: PropTypes.arrayOf(PropTypes.string),
            mXNetPayout: PropTypes.string,
            uSNetPayout: PropTypes.string,
            iNNetPayout: PropTypes.string,
            cANetPayout: PropTypes.string
        })
    }

    componentWillMount() {
        this.refreshData()
    }

    onSaveClick() {
        const { dispatch, settings } = this.props
        dispatch(saveFormulaAction(settings))
    }

    onRefreshClick() {
        this.refreshData()
    }

    refreshData() {
        const { dispatch } = this.props
        dispatch(loadFormulaAction())
    }

    onUSChanged(evt, newValue) {
        this.onSettingsChanged('usNetPayout', newValue)
    }

    onCAChanged(evt, newValue) {
        this.onSettingsChanged('caNetPayout', newValue)
    }

    onMXChanged(evt, newValue) {
        this.onSettingsChanged('mxNetPayout', newValue)
    }

    onINChanged(evt, newValue) {
        this.onSettingsChanged('inNetPayout', newValue)
    }

    onSettingsChanged(prop, value) {
        const { dispatch, settings } = this.props

        let p = {}
        p[prop] = value

        const newSettings = Object.assign({}, settings, p)
        dispatch(changedFormulaAction(newSettings))
    }

    render() {
        const { settings } = this.props
        const { variables, mxNetPayout, usNetPayout, inNetPayout, caNetPayout } = settings
        const displayVariables = variables.join(', ')
        return (
            <Card>
                <CardHeader title="System Settings" />
                <CardText>
                    <CommonActions>
                        <SaveAction handleOnClick={this.onSaveClick.bind(this)} />
                        <RefreshAction handleOnClick={this.onRefreshClick.bind(this)} />
                    </CommonActions>
                    <CommonSettingsBox>
                        <SettingDisplay label="Variables" value={displayVariables} />
                        <SettingInput label="US Net Payout" value={usNetPayout} onChange={this.onUSChanged.bind(this)} />
                        <SettingInput label="MX Net Payout" value={mxNetPayout} onChange={this.onMXChanged.bind(this)} />
                        <SettingInput label="IN Net Payout" value={inNetPayout} onChange={this.onINChanged.bind(this)} />
                        <SettingInput label="CA Net Payout" value={caNetPayout} onChange={this.onCAChanged.bind(this)} />
                    </CommonSettingsBox>
                </CardText>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    const { formulaReducer } = state
    const { settings } = formulaReducer
    return {
        settings: settings ? settings : { variables: [''], mXNetPayout: '', uSNetPayout: '', iNNetPayout: '', cANetPayout: '' }
    }
}

export default connect(mapStateToProps)(FormulasApp)