import { TextField, Button, InputAdornment, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
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
                username: '',
                password: '',
            },
            onSubmit: async (values) => {
                try {
                    setLoading(true)
                    const { data, status } = await Api.login(
                        values.username,
                        values.password
                    )
                    if (status === 200) {
                        setToken(data.auth_token)
                        setUser({
                            id: data.id,
                            username: data.username,
                            group: data.group,
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
                    id="username"
                    name="username"
                    label="Логин"
                    value={values.username}
                    onChange={handleChange}
                    className="form__textfield"
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                position="start"
                                className="input-icon"
                            >
                                <PersonIcon />
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
                    className="form__textfield"
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
