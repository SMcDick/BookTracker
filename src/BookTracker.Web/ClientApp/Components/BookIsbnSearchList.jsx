import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip';
import { styles } from '../styles'
import { blue300, indigo900 } from 'material-ui/styles/colors';

const BookIsbnSearchList = (props) => {
    return (
        <div style={styles.wrapper}>
            {
                props.isbnColl.map((element, index) => {
                    if(element.fetched) {
                        return (
                        <Chip key={index}
                            onRequestDelete={() => props.handleRequestDelete(element)}
                            style={styles.chip}>
                            {element.isbn}
                      </Chip>)
                    }
                    else {
                        return (
                        <Chip key={index}
                            backgroundColor={blue300}
                            onRequestDelete={() => props.handleRequestDelete(element)}
                            style={styles.chip}>
                            {element.isbn}
                      </Chip>)
                    }
                   
                })
            }
        </div>
    )
}

BookIsbnSearchList.propTypes = {
    handleRequestDelete: PropTypes.func.isRequired,
    isbnColl: PropTypes.array.isRequired
}

export default BookIsbnSearchList