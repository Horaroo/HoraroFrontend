import { TextField, Button, InputAdornment, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import EmailIcon from '@mui/icons-material/Email'
import { Api } from 'shared/api/Api'
import useAuth from 'shared/hooks/useAuth'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { validationSchema } from './validateShema'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const { setToken, setUser } = useAuth()
    const navigate = useNavigate()
    const [textError, setTextError] = useState()
    const { handleSubmit, values, touched, errors, handleChange, setErrors } =
        useFormik({
            initialValues: {
                email: '',
                password: '',
            },
            onSubmit: async (values) => {
                try {
                    setLoading(true)
                    const { data, status } = await Api.login(
                        values.email,
                        values.password
                    )
                    if (status === 200) {
                        setToken(data.auth_token)
                        setUser({
                            id: data.id,
                            username: data.username,
                            group: data.username,
                        })
                        navigate('/shedule')
                    }
                    setLoading(false)
                } catch (error) {
                    setLoading(false)
                    if (error.response.data) {
                        setTextError(
                            Boolean(error.response.data.non_field_errors) &&
                                error.response.data.non_field_errors[0]
                        )
                    }
                }
            },
            validationSchema: validationSchema,
        })

    return (
        <div className="auth__form-layout">
            <form
                autoComplete="false"
                onSubmit={handleSubmit}
                className="form auth__form"
            >
                <h2 className="form__title">Вход</h2>
                <TextField
                    fullWidth
                    id="email"
                    type="email"
                    name="email"
                    label="Почта"
                    value={values.email}
                    onChange={handleChange}
                    className="form__field"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
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
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Пароль"
                    type="password"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    className="form__field"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
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
                {textError !== null && (
                    <Typography color="error" className="text--error">
                        {textError}
                    </Typography>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    style={{ marginBottom: 40 }}
                    disabled={loading}
                    className="btn"
                >
                    Войти
                </Button>
                <NavLink className=" link--light mb-10" to="/reset_password">
                    Забыли пароль?
                </NavLink>
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

export default Login
