import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip';
import { styles } from '../styles'
import Responsive from '../ui/Responsive'
import { blue300, red300, grey300, green100 } from 'material-ui/styles/colors'
import withWidth from 'material-ui/utils/withWidth';

const BookIsbnSearchList = (props) => {
    return (
        <div style={styles.wrapper}>
            {
                props.isbnColl.map((element, index) => {
                    if (element.fetched) {
                        if (element.displayMobile) {
                            return (
                                <Chip key={index}
                                    backgroundColor={props.selectedIndex == index ? green100 : grey300}
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
                                    backgroundColor={props.selectedIndex == index ? green100 : grey300}
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
                                backgroundColor={props.selectedIndex == index ? green100 : blue300}
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
    handleChipClicked: PropTypes.func,
    selectedIndex: PropTypes.number
}

export default BookIsbnSearchList