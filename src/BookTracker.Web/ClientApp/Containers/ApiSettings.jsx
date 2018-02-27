import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types'

import CommonActions, { SaveAction, RefreshAction } from '../Components/CommonActions'
import CommonSettingsBox, { SettingInput, SettingDisplay } from '../Components/CommonSettingsBox'

import { saveApiSettingsAction, refreshApiSettingsAction, loadApiSettingsAction, changedApiSettingsAction } from '../Actions/apiSettingsActions'

const styles = {
    button: {
        marginRight: 12,
        marginBottom: 12
    }
};



class ApiSettingsApp extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        settings: PropTypes.shape({
            apiKey: PropTypes.string,
            baseUri: PropTypes.string,
            amazonImageUri: PropTypes.string
        })
    }

    componentWillMount() {
        this.refreshData()
    }

    onSaveClick() {
        const { dispatch, settings } = this.props
        dispatch(saveApiSettingsAction(settings))
    }

    onRefreshClick() {
        this.refreshData()
    }

    refreshData() {
        const { dispatch } = this.props
        dispatch(loadApiSettingsAction())
    }

    onApiKeyChanged(value) {
        const { settings } = this.props
        const nSettings = Object.assign({}, settings, { apiKey: value })
        this.onSettingsChanged(nSettings)
    }

    onServiceUriChanged(value) {
        const { settings } = this.props
        const nSettings = Object.assign({}, settings, { baseUri: value })
        this.onSettingsChanged(nSettings)
    }

    onAmazonImageUriChanged(value) {
        const { settings } = this.props
        const nSettings = Object.assign({}, settings, { amazonImageUri: value })
        this.onSettingsChanged(nSettings)
    }

    onSettingsChanged(newSettings) {
        const { dispatch } = this.props
        dispatch(changedApiSettingsAction(newSettings))
    }

    render() {
        const { settings } = this.props
        const { apiKey, baseUri, amazonImageUri } = settings
        return (
            <Card>
                <CardHeader title="Keepa Settings" />
                <CardText>
                    <CommonActions>
                        <SaveAction handleOnClick={this.onSaveClick.bind(this)} />
                        <RefreshAction handleOnClick={this.onRefreshClick.bind(this)} />
                    </CommonActions>
                    <CommonSettingsBox>
                        <SettingInput label="API Key" value={apiKey} onChange={this.onApiKeyChanged.bind(this)} />
                        <SettingInput label="Service Url" value={baseUri} onChange={this.onServiceUriChanged.bind(this)} />
                        <SettingInput label="Amazon Image Url" value={amazonImageUri} onChange={this.onAmazonImageUriChanged.bind(this)} />
                    </CommonSettingsBox>
                </CardText>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    const { apiSettingsReducer } = state
    const { settings } = apiSettingsReducer
    return {
        settings: settings ? settings : { apiKey: '', baseUri: '', amazonImageUri: '' }
    }
}

export default connect(mapStateToProps)(ApiSettingsApp)