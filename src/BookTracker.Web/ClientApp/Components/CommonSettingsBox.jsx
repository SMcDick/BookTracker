import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { styles } from '../styles'


export default class CommonSettingsBox extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ])
    }

    render() {
        const { children } = this.props
        if(Array.isArray(children)) {
            const lastChildren = children.length - 1
            const childrenRender = children.map((element, index) => 
            {
                if(index != lastChildren) {
                    return (<Fragment key={index}>      
                        {element}
                        <Divider />
                    </Fragment>)
                }
                else {
                    return (<Fragment key={index}>      
                        {element}
                    </Fragment>)
                }
            
            })
            return (
                <Paper zDepth={2}>
                    {childrenRender}
                </Paper>
            )
        }
        else {
            return (<Paper zDepth={2}>
                    {children}
                </Paper>)   
        }
        
    }
}

export const SettingInput = (props) => {
    return <TextField floatingLabelText={props.label} value={props.value} onChange={props.onChange} fullWidth={true} style={styles.textbox} underlineShow={false} />
}

SettingInput.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export const SettingDisplay = (props) => {
    return (
        <div style={styles.info}>
            <span>{props.label}: {props.value}</span>
        </div>
    )
}

SettingDisplay.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string
}