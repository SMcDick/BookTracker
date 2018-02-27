import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip';
import { styles } from '../styles'

const BookIsbnSearchList = (props) => {
    return (
        <div style={styles.wrapper}>
            {
                props.isbnColl.map((element, index) => {
                   return (<Chip key={index}
                         onRequestDelete={props.handleRequestDelete}
                         style={styles.chip}>
                         {element}
                   </Chip>)
                })
            }
        </div>
    )
}

BookIsbnSearchList.propTypes = {
    onDelete: PropTypes.func.isRequired,
    isbnColl: PropTypes.array.isRequired
}

export default BookIsbnSearchList