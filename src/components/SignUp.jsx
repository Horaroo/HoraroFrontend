import { Box, TextField, Button, InputAdornment } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import PersonIcon from '@material-ui/icons/Person'
import EmailIcon from '@material-ui/icons/Email'
import { NavLink, useNavigate } from 'react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useState } from 'react'
import useAuth from 'hooks/useAuth'
import { Api } from 'api/Api'

const GROUP_TEST = [
    { id: 1, name: 'У851' },
    { id: 2, name: 'У836' },
    { id: 3, name: 'У736' },
]
const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState(null)

    const { setToken, setUser } = useAuth()
    const navigate = useNavigate()

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
                <h2 className="auth__form-title">Sign up</h2>
                <TextField
                    variant="outlined"
                    type="text"
                    placeholder="Username"
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
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    variant="outlined"
                    type="email"
                    placeholder="Email"
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
                    placeholder="Password"
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
                                <PersonIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Autocomplete
                    className="mb-35"
                    id="nba teams"
                    options={GROUP_TEST}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Group"
                            variant="outlined"
                            size="small"
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
                    color="primary"
                    variant="contained"
                    size="large"
                    style={{ marginBottom: 10 }}
                >
                    Sign up
                </Button>
                <NavLink className="link  mb-10" to="/login">
                    Have an account?
                    <span className="link--light"> Sign in.</span>
                </NavLink>
            </Box>
        </div>
    )
}

export default SignUp
