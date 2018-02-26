import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper';

import { saveFormulaAction, loadFormulaAction, changedFormulaAction } from '../Actions/formulaActions'

const styles = {
    button: {
        marginRight: 12,
        marginBottom: 12
    },
    textbox: {
        marginLeft: 20
    }
};

class FormulaActions extends Component {
    static propTypes = {
        onSaveClick: PropTypes.func.isRequired,
        onRefreshClick: PropTypes.func.isRequired
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

class FormulaBox extends Component {
    static propTypes = {
        variables: PropTypes.arrayOf(PropTypes.string),
        mxNetPayout: PropTypes.string,
        usNetPayout: PropTypes.string,
        inNetPayout: PropTypes.string,
        caNetPayout: PropTypes.string,
        onDataChanged: PropTypes.func
    }

    onDataChanged(prop, newValue) {
        if (typeof this.props.onDataChanged === 'function') {
            this.props.onDataChanged(prop, newValue)
        }
    }

    onUSChanged(evt, newValue) {
        this.onDataChanged('usNetPayout', newValue)
    }

    onCAChanged(evt, newValue) {
        this.onDataChanged('caNetPayout', newValue)
    }

    onMXChanged(evt, newValue) {
        this.onDataChanged('mxNetPayout', newValue)
    }

    onINChanged(evt, newValue) {
        this.onDataChanged('inNetPayout', newValue)
    }

    render() {
        const { variables, mxNetPayout, usNetPayout, inNetPayout, caNetPayout } = this.props

        return (
            <Paper zDepth={2}>
                <div>
                <span>Variables: {
                    variables.map((e, index) => {
                        return <span key={index}>{e}, </span>
                    })
                }</span>
                    </div>
                <Divider />
                <TextField floatingLabelText="US Net Payout" value={usNetPayout} onChange={this.onUSChanged.bind(this)} fullWidth={true} style={styles.textbox} underlineShow={false} />
                <Divider />
                <TextField floatingLabelText="MX Net Payout" value={mxNetPayout} onChange={this.onMXChanged.bind(this)} fullWidth={true} style={styles.textbox} underlineShow={false} />
                <Divider />
                <TextField floatingLabelText="IN Net Payout" value={inNetPayout} onChange={this.onINChanged.bind(this)} fullWidth={true} style={styles.textbox} underlineShow={false} />
                <Divider />
                <TextField floatingLabelText="CA Net Payout" value={caNetPayout} onChange={this.onCAChanged.bind(this)} fullWidth={true} style={styles.textbox} underlineShow={false} />
            </Paper>
        )
    }
}

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
        return (
            <Card>
                <CardHeader title="System Settings" />
                <CardText>
                    <FormulaActions onSaveClick={this.onSaveClick.bind(this)} onRefreshClick={this.onRefreshClick.bind(this)} />
                    <FormulaBox variables={variables} mxNetPayout={mxNetPayout} usNetPayout={usNetPayout} inNetPayout={inNetPayout} caNetPayout={caNetPayout} onDataChanged={this.onSettingsChanged.bind(this)} />
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