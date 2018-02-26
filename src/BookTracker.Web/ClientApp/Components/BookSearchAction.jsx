import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../Actions'

const styles = {
    button: {
        margin: 12
    }
};

export default class BookSearchAction extends Component {
    static propTypes = {
        onSearchClick: PropTypes.func.isRequired,
        onRefreshClick: PropTypes.func.isRequired,
        defaultValue: PropTypes.string
    }

    constructor() {
        super()
        this.state = { textSearch: '' }
        this.handleSearchButtonClick.bind(this)
        this.handleTextSearchChange.bind(this)
    }

    handleTextSearchChange = (evt, newValue) => {
        this.setState({ textSearch: newValue })
    }

    handleSearchButtonClick = () => {
        const { textSearch } = this.state

        if (typeof this.props.onSearchClick === 'function') {
            this.props.onSearchClick(textSearch);
        }
    }

    handleRefreshButtonClick = () => {
        if (typeof this.props.onRefreshClick === 'function') {
            this.props.onRefreshClick()
        }
    }

    componentDidMount() {
        this.setState({ textSearch: this.props.defaultValue })
    }

    render() {
        const { defaultValue } = this.props

        return (
            <div>
                <TextField hintText="ISBN" defaultValue={defaultValue} onChange={this.handleTextSearchChange} />
                <RaisedButton label="Search" primary={true} onClick={this.handleSearchButtonClick} style={styles.button} />
                <RaisedButton label="Refresh" primary={false} onClick={this.handleRefreshButtonClick} style={styles.button} />
            </div>
        )
    }
}