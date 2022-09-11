import React, { useEffect, useState } from 'react'
import DoneIcon from 'assets/images/done.png'
import WarningIcon from 'assets/images/warning.png'
import { CircularProgress } from '@material-ui/core'
import PropTypes from 'prop-types'
const Activate = () => {
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(null)

    const ActivateContent = ({ icon, Component, text, isIcon }) => {
        return (
            <div className="activate__content">
                <div className="activate__content-preview">
                    {isIcon ? (
                        <img
                            className="activate__content-img"
                            src={icon}
                            alt="activate-icon"
                        />
                    ) : (
                        <Component />
                    )}
                </div>
                <p className="activate__content-text">{text}</p>
            </div>
        )
    }
    ActivateContent.propTypes = {
        icon: PropTypes.string,
        Component: PropTypes.object,
        text: PropTypes.string,
        isIcon: PropTypes.bool.isRequired,
    }
    return (
        <div className="auth__form-layout">
            <div className="auth__form activate">
                <h2 className="auth__form-title activate__title">Активация</h2>
                {loading && (
                    <ActivateContent
                        Component={CircularProgress}
                        text="Подождите, ваш аккаунт активируется"
                        isIcon={false}
                    />
                )}
                {success !== null && (
                    <div>
                        {success ? (
                            <ActivateContent
                                icon={DoneIcon}
                                text="Аккаунт успешно активирован!"
                                isIcon={true}
                            />
                        ) : (
                            <ActivateContent
                                icon={WarningIcon}
                                text="Аккаунт не активирован! Что то пошло не
                            так:("
                                isIcon={true}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Activate
