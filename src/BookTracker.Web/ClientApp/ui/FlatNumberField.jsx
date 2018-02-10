import React from 'react';
import PropTypes from 'prop-types';

const hasNumberFormat = !!(typeof Intl === 'object' && Intl && typeof Intl.NumberFormat === 'function');

export const FlatNumberField = ({ source, record = {}, locales = 'en-US', elStyle, options }) => {
    //return <span style={elStyle}>{record[source]}</span>;
    if (!record) return <span />;
    const value = record[source];
    if (value == null) return <span />;
    if (!hasNumberFormat) return <span style={elStyle}>{value}</span>;
    return <span style={elStyle}>{value.toLocaleString(locales, options)}</span>;
}

FlatNumberField.propTypes = {
    elStyle: PropTypes.object,
    locales: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
    options: PropTypes.object,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export default FlatNumberField