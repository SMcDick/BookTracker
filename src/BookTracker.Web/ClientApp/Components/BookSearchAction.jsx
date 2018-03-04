import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../Actions'
import { DEFAULT_ISBN_LENGTH } from '../constants'
import { styles } from '../styles'

export default class BookSearchAction extends Component {
    static propTypes = {
        onSearchClick: PropTypes.func.isRequired,
        onSearchAction: PropTypes.func,
        defaultValue: PropTypes.string,
        style: PropTypes.object
    }

    constructor() {
        super()
        this.state = { value: '' }
    }

    handleTextSearchChange = (evt, newValue) => {
        if(newValue.length == DEFAULT_ISBN_LENGTH) {
            this.handleSearchAction(newValue);
        }
        else {
            this.setState({ value: newValue })
        }
    }

    handleSearchButtonClick = () => {
        const { value } = this.state

        if (typeof this.props.onSearchClick === 'function') {
            this.props.onSearchClick(value);
        }
    }

    handleSearchAction(value) {
        const { onSearchAction } = this.props
        if(typeof onSearchAction === 'function') {
            onSearchAction(value)
        }
        this.setState({value : ''})
    }

    componentDidMount() {
        this.setState({ value: this.props.value })
    }

    componentWillReceiveProps(nextProps) {
        const { value } = this.state
        if (value !== nextProps.value) {
            this.setState({value: nextProps.value})
        }
    }

    render() {
        const { value } = this.state

        return (
            <React.Fragment>
                <TextField hintText="ISBN" type="number" required="required" onChange={this.handleTextSearchChange.bind(this)} value={value} style={styles.manualInputContent} />
                <RaisedButton label="Search" primary={true} onClick={this.handleSearchButtonClick.bind(this)} style={styles.button} />
            </React.Fragment>
        )
    }
}