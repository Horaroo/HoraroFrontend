import React, { useEffect, useState } from 'react'
import DoneIcon from 'assets/images/done.png'
import WarningIcon from 'assets/images/warning.png'
import { CircularProgress, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router-dom'
import { Api } from 'shared/api/Api'
const Activate = () => {
    const { token, uid } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const postActivation = async () => {
            try {
                const res = await Api.activation(uid, token)
                if (res.status === 204) {
                    setLoading(false)
                    setSuccess(true)
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000)
                }
            } catch (error) {
                setLoading(false)
                setSuccess(false)
                setTimeout(() => {
                    navigate('/signup')
                }, 3000)
                setError(error?.response.data.uid)
                console.log(error)
            }
        }
        postActivation()
    }, [token, uid, navigate])
    const ActivateContent = ({ icon, Component, text, isIcon }) => {
        return (
            <div className="layout__container">
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
                                text="Аккаунт не активирован!"
                                isIcon={true}
                            />
                        )}
                    </div>
                )}
                {error !== null && (
                    <Typography color="error" className="text--error">
                        {error}
                    </Typography>
                )}
            </div>
        </div>
    )
}

export default Activate
