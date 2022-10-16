import { TextField, Button, InputAdornment, Tooltip } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import SchoolIcon from '@mui/icons-material/School'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useAuth from 'shared/hooks/useAuth'
import { Api } from 'shared/api/Api'
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
            <form onSubmit={handleSubmit} className="form auth__form">
                <h2 className="form__title">Регистрация</h2>

                <TextField
                    type="email"
                    name="email"
                    id="email"
                    label="Почта"
                    className="form__field"
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
                    id="username"
                    name="username"
                    label="Токен"
                    className="form__field"
                    value={values.username}
                    onChange={handleChange}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                    size="small"
                    sx={{ color: 'red' }}
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
                    type="password"
                    name="password"
                    id="password"
                    label="Пароль"
                    className="form__field"
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
                    id="group"
                    name="group"
                    type="text"
                    label="Группа"
                    className="form__field"
                    value={values.group}
                    onChange={handleChange}
                    error={touched.group && Boolean(errors.group)}
                    helperText={touched.group && errors.group}
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                position="start"
                                className="input-icon"
                            >
                                <SchoolIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    style={{ marginBottom: 40 }}
                    className="btn"
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
