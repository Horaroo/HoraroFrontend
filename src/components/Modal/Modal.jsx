import { Dialog, Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Api } from 'api/Api'
import { useFormik } from 'formik'
import { changePasswordShema, deleteAccount } from './validateShema'
const Modal = ({ open, handleClose, activeType }) => {
    const [loading, setLoading] = useState(false)
    const isChangePass = activeType === 'change'
    const title =
        (activeType === 'change' && 'Смена пароля') ||
        (activeType === 'delete' && 'Удаление аккаунта')

    const { handleSubmit, values, touched, errors, handleChange, setErrors } =
        useFormik({
            initialValues: isChangePass
                ? { password: '', newPassword: '' }
                : { password: '' },
            validationSchema: isChangePass
                ? changePasswordShema
                : deleteAccount,
            onSubmit: async (values) => {
                try {
                    console.log('click')
                    setLoading(true)
                    let result
                    if (changePasswordShema) {
                        result = await Api.changePassword(
                            values.password,
                            values.newPassword
                        )
                    } else {
                        result = Api.deleteAccount(values.password)
                    }
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
                    className="auth__form-input"
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
                        className="auth__form-input"
                        size="small"
                    />
                )}
                <div className="flex flex-space-between flex-middle">
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        variant="contained"
                        style={
                            !isChangePass
                                ? {
                                      background: 'rgb(244 67 54)',
                                      color: 'white',
                                  }
                                : {
                                      background: '#3F51B5',
                                      color: 'white',
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
    handleClose: PropTypes.func.isRequired,
    activeType: PropTypes.oneOf(['change', 'delete']),
}
