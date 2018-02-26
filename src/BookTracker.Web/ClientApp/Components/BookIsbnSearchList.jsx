import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip';

const styles = {
    chip: {
        margin: 4,
    }
};

export default class BookIsbnSearchList extends Component {
    static propTypes = {
        onDelete: PropTypes.func.isRequired,
        isbnColl: PropTypes.array.isRequired
    }

    render() {
        const { isbnColl } = this.props

        return (<div style={styles.wrapper}>
            {isbnColl.map(this.renderChip, this)}
        </div>)
    }

    handleRequestDelete(key) {
        const { onDelete } = this.props
        onDelete(key)
    }

    renderChip(data) {
        return (
            <Chip
                key={data}
                onRequestDelete={() => this.handleRequestDelete(data)}
                style={styles.chip}>
                {data}
            </Chip>
        );
    }
}