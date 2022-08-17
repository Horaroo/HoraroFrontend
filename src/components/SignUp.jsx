import { Box, TextField, Button, InputAdornment } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import PersonIcon from '@material-ui/icons/Person'
import EmailIcon from '@material-ui/icons/Email'
import { NavLink, useNavigate } from 'react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useState } from 'react'
import useAuth from 'hooks/useAuth'
import { Api } from 'api/Api'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [groups, setGroups] = useState([])
    const { setToken, setUser } = useAuth()
    const navigate = useNavigate()

    const onSearchGroup = async (e) => {
        try {
            const { data } = await Api.searchGroup(e.target.value)
            setGroups(data)
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async () => {
        try {
            setLoading(true)
            const { data } = await Api.register(
                username,
                password,
                selectedGroup?.name,
                email
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
        }
    }
    return (
        <div className="auth__form-layout">
            <Box component="form" className="auth__form" spacing={2}>
                <h2 className="auth__form-title">Регистрация</h2>
                <TextField
                    variant="outlined"
                    type="text"
                    placeholder="Логин"
                    className="auth__form-input"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
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
                    placeholder="Почта"
                    className="auth__form-input"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
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
                    placeholder="Пароль"
                    className="auth__form-input"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
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
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Группа"
                            variant="outlined"
                            size="small"
                            onChange={onSearchGroup}
                        />
                    )}
                    getOptionLabel={(option) => option.name}
                    style={{ width: '100%' }}
                    value={selectedGroup}
                    onChange={(_event, group) => {
                        setSelectedGroup(group)
                    }}
                />

                <Button
                    onClick={onSubmit}
                    variant="contained"
                    size="large"
                    color="primary"
                    style={{ marginBottom: 40 }}
                >
                    Зарегистрироваться
                </Button>
                <NavLink className="link link--not-hover mb-10" to="/login">
                    Уже имеете учетную запись?
                    <span className="link--light"> Войдите</span>
                </NavLink>
            </Box>
        </div>
    )
}

export default SignUp
