import { Box, TextField, Button, InputAdornment } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import PersonIcon from '@material-ui/icons/Person'
import { Api } from 'api/Api'
import useAuth from 'hooks/useAuth'
import { useCallback, useState } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { setToken, setUser } = useAuth()
    const navigate = useNavigate()
    const onSubmit = async () => {
        try {
            setLoading(true)
            const { data, status } = await Api.login(username, password)
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
        }
    }
    return (
        <div className="auth__form-layout">
            <Box component="form" className="auth__form" spacing={2}>
                <h2 className="auth__form-title">Log in</h2>
                <TextField
                    variant="outlined"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                    type="text"
                    placeholder="Username"
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
                    variant="outlined"
                    type="password"
                    placeholder="Password"
                    className="auth__form-input"
                    size="small"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
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
                <Button
                    onClick={onSubmit}
                    color="primary"
                    variant="contained"
                    size="large"
                    style={{ marginBottom: 10 }}
                >
                    Log in
                </Button>
                <NavLink className="link link--light mb-10" to="/login">
                    Forgot Password?
                </NavLink>
                <NavLink className="link link--not-hover" to="/signup">
                    Not registered yet?
                    <span className="link--light"> Sign Up here!</span>
                </NavLink>
            </Box>
        </div>
    )
}

export default Login
