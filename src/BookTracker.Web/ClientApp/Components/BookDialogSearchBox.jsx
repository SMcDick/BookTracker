import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs'

import BookSearchAction from './BookSearchAction'
import Scanner from './Scanner'

import { styles } from '../styles'

export default class BookDialogSearchBox extends Component {
    static propTypes = {
        value: PropTypes.string,
        onSearchClick: PropTypes.func.isRequired,
        onSearchAction: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = { detectedValue: '', tabValue: 'manual', scannerOn: false }
    }

    handleOnDetected(value) {
        this.setState({ detectedValue: value, tabValue: 'manual' })
    }

    handleSearchClick(value) {
        const { onSearchClick } = this.props
        onSearchClick(value)
    }

    handleTabChange(tabValue) {
       this.setState({ tabValue: tabValue, scannerOn: tabValue === 'dynamic' })
    }

    onSearchAction(value) {
        const { onSearchAction } = this.props
        if(typeof onSearchAction === 'function') {
            onSearchAction(value)
        }
    }

    render() {
        const { detectedValue, tabValue, scannerOn } = this.state

        return (
            <Paper zDepth={1}>
                <Tabs value={tabValue} onChange={this.handleTabChange.bind(this)}>
                <Tab label="Manual" value="manual">
                        <div style={styles.manualInput}>
                            <BookSearchAction value={detectedValue} onSearchClick={this.handleSearchClick.bind(this)} onSearchAction={this.onSearchAction.bind(this)} />
                        </div>
                    </Tab>
                    <Tab label="Scan" value="dynamic">
                        <Scanner onDetected={this.handleOnDetected.bind(this)} scannerOn={scannerOn} />
                    </Tab>
                </Tabs>
            </Paper>
        )
    }
}