import {
    Box,
    TextField,
    Button,
    InputAdornment,
    Typography,
} from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import PersonIcon from '@material-ui/icons/Person'
import EmailIcon from '@material-ui/icons/Email'
import { NavLink, useNavigate } from 'react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useCallback, useEffect, useState } from 'react'
import useAuth from 'hooks/useAuth'
import { Api } from 'api/Api'
import { useFormik } from 'formik'
import { validationSchema } from './validateShema'

const SignUp = () => {
    const [loading, setLoading] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [groups, setGroups] = useState([])
    const { setToken, setUser } = useAuth()
    const [textError, setTextError] = useState(null)
    const navigate = useNavigate()
    const { handleSubmit, values, touched, errors, handleChange, setErrors } =
        useFormik({
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
                        selectedGroup?.id,
                        values.email
                    )
                    // setToken(data.auth_token)
                    setUser({
                        id: data.id,
                        username: data.username,
                        group: data.group,
                    })
                    navigate('/login')

                    setLoading(false)
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

    const getGroups = useCallback(async () => {
        try {
            const { data } = await Api.searchGroup('')
            setGroups(data)
        } catch (error) {
            console.log(error.message)
        }
    }, [setGroups])

    useEffect(() => {
        const getGroups = async () => {
            try {
                const { data } = await Api.searchGroup('')
                setGroups(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getGroups()
    }, [])

    const onSearchGroup = async (e) => {
        try {
            const { data } = await Api.searchGroup(e.target.value)
            setGroups(data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="auth__form-layout">
            <form onSubmit={handleSubmit} className="auth__form">
                <h2 className="auth__form-title">Регистрация</h2>
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
                <Autocomplete
                    className="mb-35"
                    id="nba teams"
                    options={groups}
                    noOptionsText="Группа не найдена"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Группа"
                            variant="outlined"
                            size="small"
                            onChange={onSearchGroup}
                            name="group"
                            error={Boolean(errors.group)}
                            helperText={errors?.group}
                        />
                    )}
                    getOptionLabel={(option) => option.name}
                    style={{ width: '100%' }}
                    value={selectedGroup}
                    onChange={(_event, group) => {
                        setSelectedGroup(group)
                        setErrors({ group: null })
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
