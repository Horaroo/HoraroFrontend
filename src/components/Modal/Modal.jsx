import { Dialog, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Api, clearToken } from 'shared/api/Api'
import { useFormik } from 'formik'
import { changePasswordShema, deleteAccount } from './validateShema'
import { useNavigate } from 'react-router-dom'
import useAuth from 'shared/hooks/useAuth'
const Modal = ({ open, handleClose, isChangePass }) => {
    const { logOut } = useAuth()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const title = isChangePass ? 'Смена пароля' : 'Удаление аккаунта'
    const {
        handleSubmit,
        values,
        touched,
        errors,
        handleChange,
        setErrors,
        setValues,
    } = useFormik({
        initialValues: isChangePass
            ? { password: '', newPassword: '' }
            : { password: '' },
        validationSchema: isChangePass ? changePasswordShema : deleteAccount,
        onSubmit: async (values) => {
            try {
                setLoading(true)
                let result
                console.log(isChangePass)
                if (isChangePass) {
                    result = await Api.changePassword(
                        values.password,
                        values.newPassword
                    )
                } else {
                    result = await Api.deleteAccount(values.password)
                    console.log(result)
                    if (result.status === 204) {
                        navigate('/login')
                        logOut()
                        await clearToken()
                    }
                }
                handleClose()
                setLoading(false)
            } catch (error) {
                setLoading(false)
                if (error.response.data) {
                    setErrors({
                        password:
                            Boolean(error.response.data.current_password) &&
                            error.response.data.current_password[0],
                    })
                }
            }
        },
    })

    useEffect(() => {
        setValues({ password: '' })
    }, [isChangePass, setValues])
    return (
        <Dialog
            maxWidth="lg"
            onClose={handleClose}
            open={open}
            className="auth__form-layout modal"
        >
            <form onSubmit={handleSubmit} className="auth__form modal__form">
                <h2 className="auth__form-title">{title}</h2>
                <TextField
                    id="password"
                    variant="outlined"
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    type="text"
                    name="password"
                    onChange={handleChange}
                    placeholder="Текущий пароль"
                    className="form__textfield"
                    size="small"
                />
                {isChangePass && (
                    <TextField
                        id="newPassword"
                        variant="outlined"
                        value={values.newPassword}
                        error={
                            touched.newPassword && Boolean(errors.newPassword)
                        }
                        helperText={touched.newPassword && errors.newPassword}
                        type="text"
                        name="newPassword"
                        onChange={handleChange}
                        placeholder="Новый пароль"
                        className="form__textfield"
                        size="small"
                    />
                )}

                <div className="flex flex-space-between flex-middle modal__btns">
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        variant="contained"
                        style={
                            !isChangePass
                                ? {
                                      background: 'rgb(244 67 54)',
                                      color: 'white',
                                      marginRight: '17px',
                                  }
                                : {
                                      background: '#3F51B5',
                                      color: 'white',
                                      marginRight: '17px',
                                  }
                        }
                        type="submit"
                    >
                        {isChangePass ? 'Сменить' : 'Удалить'}
                    </Button>
                    <Button onClick={handleClose}>Закрыть</Button>
                </div>
            </form>
        </Dialog>
    )
}
export default Modal

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    isChangePass: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,
}
