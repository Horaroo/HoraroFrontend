import { TextField, Button, InputAdornment, Tooltip } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useAuth from 'hooks/useAuth'
import { Api } from 'api/Api'
import { useFormik } from 'formik'
import { validationSchema } from './validateShema'
import { toast } from 'react-toastify'
const SignUp = () => {
    const [loading, setLoading] = useState(false)
    const { setUser } = useAuth()
    const navigate = useNavigate()

    const {
        handleSubmit,
        values,
        touched,
        errors,
        handleChange,
        setErrors,
        resetForm,
    } = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: '',
            group: '',
        },
        onSubmit: async (values) => {
            try {
                setLoading(true)
                const { data } = await Api.register(
                    values.username,
                    values.password,
                    values.group,
                    values.email
                )
                setUser({
                    id: data.id,
                    username: data.username,
                    group: data.group,
                })
                toast.success(
                    `На почту ${values.email} отправлено письмо для активации аккаунта.`
                )
                setLoading(false)
                resetForm()
            } catch (error) {
                setLoading(false)
                console.log(error.message)
                if (error.response.data) {
                    setErrors({
                        username:
                            Boolean(error.response.data.username) &&
                            error.response.data.username[0],
                        email:
                            Boolean(error.response.data.email) &&
                            error.response.data.email[0],
                        group:
                            Boolean(error.response.data.group) &&
                            error.response.data.group[0],
                    })
                }
            }
        },
        validationSchema: validationSchema,
    })
    return (
        <div className="auth__form-layout">
            <form onSubmit={handleSubmit} className="auth__form">
                <h2 className="auth__form-title">Регистрация</h2>
                <Tooltip
                    interactive
                    title="Логин используется в качестве токена"
                    placement="bottom"
                >
                    <TextField
                        variant="outlined"
                        id="username"
                        name="username"
                        type="text"
                        label="Логин"
                        className="auth__form-input"
                        value={values.username}
                        onChange={handleChange}
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                        size="small"
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
                </Tooltip>

                <TextField
                    variant="outlined"
                    type="email"
                    name="email"
                    id="email"
                    label="Почта"
                    className="auth__form-input"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
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

                <TextField
                    variant="outlined"
                    type="password"
                    name="password"
                    id="password"
                    label="Пароль"
                    className="auth__form-input"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
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
                    variant="outlined"
                    id="group"
                    name="group"
                    type="text"
                    label="Группа"
                    className="auth__form-input"
                    value={values.group}
                    onChange={handleChange}
                    error={touched.group && Boolean(errors.group)}
                    helperText={touched.group && errors.group}
                    size="small"
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    color="primary"
                    style={{ marginBottom: 40 }}
                    disabled={loading}
                >
                    Зарегистрироваться
                </Button>
                <NavLink className="link link--not-hover mb-10" to="/login">
                    Уже имеете учетную запись?
                    <span className="link--light"> Войдите</span>
                </NavLink>
            </form>
        </div>
    )
}

export default SignUp
