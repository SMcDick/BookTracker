import React from 'react';
import PropTypes from 'prop-types';

import FalseIcon from 'material-ui/svg-icons/content/clear';
import TrueIcon from 'material-ui/svg-icons/action/done';

export const BooleanField = ({ source, record = {}, elStyle }) => {
    if (record[source] === false) {
        return <FalseIcon style={elStyle} />;
    }

    if (record[source] === true) {
        return <TrueIcon style={elStyle} />;
    }

    return <span style={elStyle} />;
};

BooleanField.propTypes = {
    addLabel: PropTypes.bool,
    elStyle: PropTypes.object,
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};
//based on https://github.com/marmelab/admin-on-rest/blob/0622e8c8c54d128dabc49518e0ba7bf6d3cca62b/src/mui/field/BooleanField.js