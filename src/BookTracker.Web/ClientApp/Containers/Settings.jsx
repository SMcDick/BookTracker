import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';

import SettingsBoxSimple from '../Components/SettingsBoxSimple'
import SettingsBox from '../Components/SettingsBox'
import CommonActions, { SaveAction, RefreshAction } from '../Components/CommonActions'
import { fetchConfig, postConfig, changedConfig } from '../Actions'
import { styles } from '../styles'

class SettingsApp extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        boxes: PropTypes.object.isRequired
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
        dispatch(fetchConfig())
    }

    onSaveClick() {
        const { dispatch, boxes } = this.props
        dispatch(postConfig(boxes))
    }

    onBoxChanged(box, key) {
        const { boxes, dispatch } = this.props
        let nConfig = Object.assign({}, boxes)

        nConfig[`box${key}`] = box

        dispatch(changedConfig(nConfig))
    }

    onBoxDisabled(box, key, enabled) {
        const { boxes, dispatch } = this.props
        let nConfig = Object.assign({}, boxes)

        nConfig[`box${key}`].enabled = enabled

        dispatch(changedConfig(nConfig))
    }

    onDisplayRejectedToogle(evt, enabled) {
        const { boxes, dispatch } = this.props
        const nConfig = Object.assign({}, boxes, { displayRejected: enabled})
        dispatch(changedConfig(nConfig))
    }

    onDisplayRejectedMobileToogle(evt, enabled) {
        const { boxes, dispatch } = this.props
        const nConfig = Object.assign({}, boxes, { displayRejectedMobile: enabled })
        dispatch(changedConfig(nConfig))
    }

    render() {
        const { dispatch, boxes } = this.props
        
        
        if (boxes !== undefined && boxes.box1 !== undefined) {
            const { box1, box2, box3, box4, box5, displayRejected, displayRejectedMobile } = boxes
            const rejectedText = displayRejected ? 'Display as row' : 'Display as rejected'
            const rejectedMobileText = displayRejectedMobile ? 'Display rejected (Mobile)' : 'Hide rejected (Mobile)'
            return (
                <Card>
                    <CardHeader title="Settings" />
                    <CardText>
                        <CommonActions>
                            <SaveAction handleOnClick={this.onSaveClick.bind(this)} />
                            <RefreshAction handleOnClick={this.onRefreshClick.bind(this)} />
                            <Toggle label={rejectedText} labelPosition="right" style={styles.toggle} onToggle={this.onDisplayRejectedToogle.bind(this)} toggled={displayRejected} />
                            <Toggle label={rejectedMobileText} labelPosition="right" style={styles.toggle} onToggle={this.onDisplayRejectedMobileToogle.bind(this)} toggled={displayRejectedMobile} />
                        </CommonActions>

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