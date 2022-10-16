import { TextField, Button, InputAdornment, Grid } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import EmailIcon from '@mui/icons-material/Email'
import { Api } from 'shared/api/Api'
import { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { setNewPassSchema, resetPassSchema } from './validateShema'
import { useFormik } from 'formik'
import { ErrorMessage } from 'components/ErrorMessage'

const ResetPassword = ({ isSetNewPass }) => {
    const [loading, setLoading] = useState(false)
    const { token, uid } = useParams()
    const [isSend, setIsSend] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const { handleSubmit, values, touched, errors, handleChange, setErrors } =
        useFormik({
            initialValues: isSetNewPass
                ? { password: '', confirmPassword: '' }
                : { email: '' },
            validationSchema: isSetNewPass ? setNewPassSchema : resetPassSchema,
            onSubmit: async (values) => {
                try {
                    console.log('click')
                    setLoading(true)
                    if (isSetNewPass) {
                        await Api.setNewPassword(uid, token, values.password)
                        navigate('/login')
                    } else {
                        const res = await Api.resetPassword(values.email)
                        if (res.status === 204) setIsSend(true)
                    }
                    setLoading(false)
                } catch (error) {
                    setLoading(false)
                    if (error.response.data) {
                        setError(error.response.data.new_password[0])
                    }
                }
            },
        })

    return (
        <div className="auth__form-layout">
            <form onSubmit={handleSubmit} className="auth__form">
                <h2 className="auth__form-title">Cброс пароля</h2>
                {!isSetNewPass ? (
                    <div className="auth__form-text w-100">
                        {isSend ? (
                            `На почту ${values.email} отправлена инструкция для сброса пароля`
                        ) : (
                            <TextField
                                id="email"
                                variant="outlined"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                className="form__textfield"
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                type="email"
                                label="Почта"
                                size="small"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment
                                            position="start"
                                            className="input-icon"
                                        >
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    </div>
                ) : (
                    <>
                        <TextField
                            id="password"
                            variant="outlined"
                            value={values.password}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            type="text"
                            name="password"
                            onChange={handleChange}
                            placeholder="Новый пароль"
                            className="form__textfield"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment
                                        position="start"
                                        className="input-icon"
                                    >
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            password="confirmPassword"
                            variant="outlined"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            error={
                                touched.confirmPassword &&
                                Boolean(errors.confirmPassword)
                            }
                            helperText={
                                touched.confirmPassword &&
                                errors.confirmPassword
                            }
                            type="text"
                            placeholder="Подтвердите новый пароль"
                            className="form__textfield"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment
                                        position="start"
                                        className="input-icon"
                                    >
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </>
                )}

                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    size="large"
                    style={{ marginBottom: 20 }}
                    disabled={isSend || loading}
                >
                    {isSetNewPass ? 'Отправить' : 'Сбросить'}
                </Button>

                <Grid item sx={12}>
                    <ErrorMessage message={error} />
                </Grid>

                <NavLink className="link link--not-hover" to="/signup">
                    Ещё не зарегистрированы?
                    <span className="link--light">
                        {' '}
                        Зарегистрируйтесь здесь!
                    </span>
                </NavLink>
            </form>
        </div>
    )
}
ResetPassword.propTypes = {
    isSetNewPass: PropTypes.bool,
}
export default ResetPassword
