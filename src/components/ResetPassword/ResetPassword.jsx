import { TextField, Button, InputAdornment } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import EmailIcon from '@material-ui/icons/Email'
import { Api } from 'api/Api'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { setNewPassSchema, resetPassSchema } from './validateShema'
import { useFormik } from 'formik'

const ResetPassword = ({ isSetNewPass }) => {
    const [loading, setLoading] = useState(false)
    const { token, uid } = useParams()
    const [isSend, setIsSend] = useState(false)
    const navigate = useNavigate()

    const { handleSubmit, values, touched, errors, handleChange } = useFormik({
        initialValues: isSetNewPass
            ? { password: '', confirmPassword: '' }
            : { email: '' },
        validationSchema: isSetNewPass ? setNewPassSchema : resetPassSchema,
        onSubmit: async (values) => {
            try {
                console.log('click')
                setLoading(true)
                if (isSetNewPass) {
                    await Api.setpassword(uid, token, values.password)
                    navigate('/login')
                } else {
                    const res = await Api.resetPassword(values.email)
                    if (res.status === 201) setIsSend(true)
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
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
                                className="auth__form-input"
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
                            className="auth__form-input"
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
                            className="auth__form-input"
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
                    style={{ marginBottom: 10 }}
                    disabled={isSend || loading}
                >
                    {isSetNewPass ? 'Отправить' : 'Сбросить'}
                </Button>
            </form>
        </div>
    )
}
ResetPassword.propTypes = {
    isSetNewPass: PropTypes.bool,
}
export default ResetPassword
