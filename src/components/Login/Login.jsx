import {
    TextField,
    Button,
    InputAdornment,
    Typography,
} from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import PersonIcon from '@material-ui/icons/Person'
import { Api } from 'api/Api'
import useAuth from 'hooks/useAuth'
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
                    console.log(data, status)
                    if (status === 200) {
                        setToken(data.auth_token)
                        setUser({
                            id: data.id,
                            username: data.username,
                            group: data.group,
                        })
                        navigate('/')
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
            <form onSubmit={handleSubmit} className="auth__form">
                <h2 className="auth__form-title">Вход</h2>
                <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Логин"
                    variant="outlined"
                    value={values.username}
                    onChange={handleChange}
                    className="auth__form-input"
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
                    className="auth__form-input"
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
                    color="primary"
                    variant="contained"
                    size="large"
                    style={{ marginBottom: 40 }}
                    disabled={loading}
                >
                    Войти
                </Button>
                <NavLink
                    className="link link--light mb-10"
                    to="/reset_password"
                >
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
