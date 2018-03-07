import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../Actions'
import { DEFAULT_ISBN_LENGTH } from '../constants'
import { styles } from '../styles'
import storage from 'material-ui/svg-icons/device/storage';

export default class BookSearchAction extends Component {
    static propTypes = {
        onSearchClick: PropTypes.func.isRequired,
        onSearchAction: PropTypes.func,
        defaultValue: PropTypes.string,
        style: PropTypes.object
    }

    constructor() {
        super()
        this.state = { storageValue: '' }
        this.focusTextInput = this.focusTextInput.bind(this)
    }

    focusTextInput() {
        setTimeout(() => {
            this.textInput.focus();
        }, 400)
    }

    handleTextSearchChange = (evt, newValue) => {
        if (newValue.length <= DEFAULT_ISBN_LENGTH) {
            this.setState({ storageValue: newValue })
        }
    }

    handleSearchButtonClick = () => {
        const { onSearchClick } = this.props
        const { storageValue } = this.state
        if (typeof onSearchClick === 'function') {
            this.props.onSearchClick(storageValue);
        }
        this.setState({ storageValue: '' })
        this.focusTextInput()
    }

    handleSearchAction(value) {
        const { onSearchAction } = this.props
        const { storageValue } = this.state

        if (typeof onSearchAction === 'function') {
            onSearchAction(storageValue)
        }
        this.setState({ storageValue: '' })
        this.focusTextInput()
    }

    componentDidMount() {
        this.setState({ storageValue: this.props.defaultValue })
        this.focusTextInput()
    }

    componentWillReceiveProps(nextProps) {
        const { defaultValue } = this.props
        if (defaultValue !== nextProps.defaultValue) {
            this.setState({ storageValue: nextProps.defaultValue })
        }
        this.focusTextInput()
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSearchButtonClick()
        }
    }

    render() {
        const { storageValue } = this.state
        const value = storageValue ? storageValue : ''
        return (
            <React.Fragment>
                <TextField hintText="ISBN"
                    type="number"
                    maxLength={DEFAULT_ISBN_LENGTH}
                    required="required"
                    onChange={this.handleTextSearchChange.bind(this)}
                    ref={(input) => { this.textInput = input }}
                    value={value}
                    style={styles.manualInputContent}
                    onKeyPress={this._handleKeyPress.bind(this)} />
                <RaisedButton label="Search"
                    primary={true}
                    onClick={this.handleSearchButtonClick.bind(this)}
                    style={styles.button} />
            </React.Fragment>
        )
    }
}