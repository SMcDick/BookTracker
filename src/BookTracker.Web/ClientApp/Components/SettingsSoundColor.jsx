import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import PropTypes from 'prop-types'

const colorsDatasource = [
    { key: '', value: '' },
    { key: 'Red', value: '#FFCDD2' },
    { key: 'Blue', value: '#BBDEFB' },
    { key: 'Teal', value: '#B2DFDB' },
    { key: 'Cyan', value: '#B2EBF2' },
    { key: 'Green', value: '#C8E6C9' },
    { key: 'Yellow', value: '#FFF9C4' },
    { key: 'Orange', value: '#FFE0B2' }
];

const colorDataSourceConfig = {
    text: 'key',
    value: 'value',
};

const soundDatasource = [
    { key: '', value: '' },
    { key: 'Sound 1', value: '1.mp3' },
    { key: 'Sound 2', value: '2.mp3' },
    { key: 'Sound 3', value: '3.mp3' },
    { key: 'Sound 4', value: '4.mp3' },
    { key: 'Sound 5', value: '5.mp3' }
];
const soundDataSourceConfig = {
    text: 'key',
    value: 'value',
};

export default class SettingsSoundColor extends Component {
    static propTypes = {
        onColorChange: PropTypes.func,
        onSoundChange: PropTypes.func,
        color: PropTypes.string.isRequired,
        sound: PropTypes.string.isRequired
    }

    handleColorChange(event, index, value) {
        if (typeof this.props.onColorChange === 'function') {
            this.props.onColorChange(value)
        }
    }

    handleSoundAutoCompleteChange(event, index, value) {
        if (typeof this.props.onSoundChange === 'function') {
            this.props.onSoundChange(value)
        }
    }

    render() {
        const { color, sound } = this.props
        return (
            <div>
                <SelectField
                    floatingLabelText="Sound"
                    value={sound}
                    onChange={this.handleSoundAutoCompleteChange.bind(this)}>
                    {
                        soundDatasource.map((e, i) => {
                            return <MenuItem key={i} value={e.value} primaryText={e.key} />
                        })
                    }
                </SelectField>
                <SelectField
                    floatingLabelText="Color"
                    value={color}
                    onChange={this.handleColorChange.bind(this)}>
                    {
                        colorsDatasource.map((e, i) => {
                            return <MenuItem key={i} value={e.value} primaryText={e.key} />
                        })
                    }
                </SelectField>
            </div>
        )
    }
}