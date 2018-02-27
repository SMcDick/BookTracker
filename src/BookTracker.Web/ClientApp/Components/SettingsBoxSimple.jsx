import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import { styles } from '../styles'
import SettingsSoundColor from './SettingsSoundColor'
import PropTypes from 'prop-types'

export default class SettingsBoxSimple extends Component {
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

        const nBox = Object.assign(box, { offerGreaterThan: newValue ? parseFloat(newValue) : '' })

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
                            <TextField floatingLabelText="offer greater than" type="number" required="required" onChange={this.onOfferChanged.bind(this)} value={offerGreaterThan} style={styles.soundColorText} />
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