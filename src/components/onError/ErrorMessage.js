import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import "./ErrorMessage.css";

const ErrorMessage = ({ error }) => (
    <Alert
        className='error'
        type='error'
        message={`Error: Can't load data! ${error}`}
        description='Error occurred while trying to download data from server'
        banner
    />
);

ErrorMessage.propTypes = {
    error: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ErrorMessage;
