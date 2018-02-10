import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    list: {
        display: 'flex',
        listStyleType: 'none',
    },
    image: {
        margin: '0.5rem',
        maxHeight: '10rem',
    },
};

export const ImageField = ({ elStyle = {}, record, source, src, title }) => {
    const sourceValue = record[source];
    if (!sourceValue) {
        return <div />;
    }

    if (Array.isArray(sourceValue)) {
        const style = {
            ...styles.list,
            ...elStyle,
        };
        return (
            <ul style={style}>
                {sourceValue.map((file, index) => {
                    const titleValue = get(file, title) || title;
                    const srcValue = get(file, src) || title;

                    return (
                        <li key={index}>
                            <img
                                alt={titleValue}
                                title={titleValue}
                                src={srcValue}
                                style={styles.image}
                            />
                        </li>
                    );
                })}
            </ul>
        );
    }

    const titleValue = record[title] || title;

    return (
        <div style={elStyle}>
            <img
                title={titleValue}
                alt={titleValue}
                src={sourceValue}
                style={styles.image}
            />
        </div>
    );
};

ImageField.propTypes = {
    elStyle: PropTypes.object,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
    title: PropTypes.string,
};

export default ImageField;

//based on https://github.com/marmelab/admin-on-rest/blob/0622e8c8c54d128dabc49518e0ba7bf6d3cca62b/src/mui/field/ImageField.js