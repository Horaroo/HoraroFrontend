import React from 'react'
import PropTypes from 'prop-types'

export const ErrorMessage = ({ message }) => {
    if (!message) return null
    return (
        <div className="error-message">
            <p className="error-message__text">{message}</p>
        </div>
    )
}
ErrorMessage.propTypes = {
    message: PropTypes.string,
}
