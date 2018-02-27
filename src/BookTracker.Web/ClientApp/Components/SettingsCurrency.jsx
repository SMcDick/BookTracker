import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types'

export default class SettingsCurrency extends Component {
    static propTypes = {
        onCurrencyChange: PropTypes.func,
        currencyRate: PropTypes.number.isRequired,
        currencyName: PropTypes.string.isRequired
    }

    handleCurrencyChange(event, newValue) {
        if (typeof this.props.onCurrencyChange === 'function') {
            const sVal = newValue !== '' ? newValue.replace(/\$(-?\d+.\d{2})/, "$1") : '0'
            const val = parseFloat(sVal)
            this.props.onCurrencyChange(val)
        }
    }

    render() {
        const { currencyRate, currencyName } = this.props
        const displayCurrency = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currencyRate))
        const label = `Currency ${currencyName}`
        return (
            <div>
                <TextField floatingLabelText={label} value="$1.00" disabled={true} />
                <TextField floatingLabelText="US Dollar" value={displayCurrency} onChange={this.handleCurrencyChange.bind(this)} />
            </div>
        )
    }
}