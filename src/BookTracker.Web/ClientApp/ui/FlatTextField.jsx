import React from 'react';
import PropTypes from 'prop-types';

const FlatTextField = ({ source, record = {}, elStyle }) => {
    return <span style={elStyle}>{record[source]}</span>;
}

FlatTextField.propTypes = {
    addLabel: PropTypes.bool,
    elStyle: PropTypes.object,
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export default FlatTextField;
//based on https://github.com/marmelab/admin-on-rest/blob/0622e8c8c54d128dabc49518e0ba7bf6d3cca62b/src/mui/field/TextField.js