import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types'

import { saveApiSettingsAction, refreshApiSettingsAction, loadApiSettingsAction, changedApiSettingsAction } from '../Actions/apiSettingsActions'

const styles = {
    button: {
        marginRight: 12,
        marginBottom: 12
    }
};

class ApiSettingsActions extends Component {
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

class ApiSettingsBox extends Component {
    static propTypes = {
        apiKey: PropTypes.string.isRequired,
        serviceUri: PropTypes.string.isRequired,
        amazonImageUri: PropTypes.string.isRequired,
        onApiKeyChanged: PropTypes.func,
        onServiceUriChanged: PropTypes.func,
        onAmazonImageUriChanged: PropTypes.func
    }

    onApiKeyChange(evt, newValue) {
        if (typeof this.props.onApiKeyChanged === 'function') {
            this.props.onApiKeyChanged(newValue)
        }
    }

    onServiceUriChange(evt, newValue) {
        if (typeof this.props.onServiceUriChanged === 'function') {
            this.props.onServiceUriChanged(newValue)
        }
    }

    onAmazonImageUriChange(evt, newValue) {
        if (typeof this.props.onAmazonImageUriChanged === 'function') {
            this.props.onAmazonImageUriChanged(newValue)
        }
    }

    render() {
        const { apiKey, serviceUri, amazonImageUri } = this.props

        return (
            <React.Fragment>
                <Card>
                    <CardText>
                        <div>
                            <TextField floatingLabelText="API Key" value={apiKey} onChange={this.onApiKeyChange.bind(this)} fullWidth={true} />
                        </div>
                        <div>
                            <TextField floatingLabelText="Service Url" value={serviceUri} onChange={this.onServiceUriChange.bind(this)} fullWidth={true} />
                        </div>
                        <div>
                            <TextField floatingLabelText="Amazon Image Url" value={amazonImageUri} onChange={this.onAmazonImageUriChange.bind(this)} fullWidth={true} />
                        </div>
                    </CardText>
                </Card>
            </React.Fragment>
        )
    }
}

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
                <CardHeader title="System Settings" />
                <CardText>
                    <ApiSettingsActions onSaveClick={this.onSaveClick.bind(this)} onRefreshClick={this.onRefreshClick.bind(this)} />
                    <ApiSettingsBox apiKey={apiKey} serviceUri={baseUri} amazonImageUri={amazonImageUri}
                        onApiKeyChanged={this.onApiKeyChanged.bind(this)}
                        onServiceUriChanged={this.onServiceUriChanged.bind(this)}
                        onAmazonImageUriChanged={this.onAmazonImageUriChanged.bind(this)} />
                </CardText>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    const { apiSettingsReducer } = state
    const { settings } = apiSettingsReducer
    return {
        settings: settings ? settings : { apiKey: '', serviceUri: '', amazonImageUri: '' }
    }
}

export default connect(mapStateToProps)(ApiSettingsApp)