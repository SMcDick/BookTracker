import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip';
import { styles } from '../styles'
import { blue300, red300, grey300} from 'material-ui/styles/colors';

const BookIsbnSearchList = (props) => {
    return (
        <div style={styles.wrapper}>
            {
                props.isbnColl.map((element, index) => {
                    if (element.fetched) {
                        if (element.displayMobile) {
                            return (
                                <Chip key={index}
                                    backgroundColor={grey300}
                                    onRequestDelete={() => props.handleRequestDelete(element)}
                                    style={styles.chip}
                                    onClick={() => props.handleChipClicked(element)}
                                >
                                    {element.isbn}
                                </Chip>
                            )
                        }
                        else {
                            return (
                                <Chip key={index}
                                    backgroundColor={red300}
                                    onRequestDelete={() => props.handleRequestDelete(element)}
                                    style={styles.chip}
                                    onClick={() => props.handleChipClicked(element)}
                                >
                                    {element.isbn}
                                </Chip>
                            )
                        }

                    }
                    else {
                        return (
                            <Chip key={index}
                                backgroundColor={blue300}
                                onRequestDelete={() => props.handleRequestDelete(element)}
                                style={styles.chip}
                                onClick={() => props.handleChipClicked(element)}
                            >
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
    isbnColl: PropTypes.array.isRequired,
    handleChipClicked: PropTypes.func.isRequired
}

export default BookIsbnSearchList