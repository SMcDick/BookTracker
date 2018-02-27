import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton';
import { styles } from '../styles'

export default class CommonActions extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ])
    }

    render() {
        const { children } = this.props
        return (
            <div>
                {children}
            </div>
        )
    }
}

export const Action = (props) => {
    return (
        <RaisedButton label={props.label} primary={props.isPrimary} onClick={props.handleOnClick} style={styles.button} />
    )
}

Action.propTypes = {
    label: PropTypes.string.isRequired,
    isPrimary: PropTypes.bool.isRequired,
    handleOnClick: PropTypes.func.isRequired
}

export const SaveAction = (props) => {
    return <Action label="Save" isPrimary={true} handleOnClick={props.handleOnClick} style={styles.button} />
}

SaveAction.propTypes = {
    handleOnClick: PropTypes.func.isRequired
}

export const RefreshAction =(props) => {
    return <Action label="Refresh" isPrimary={false} handleOnClick={props.handleOnClick} style={styles.button} />
}

RefreshAction.propTypes = {
    handleOnClick: PropTypes.func.isRequired
}