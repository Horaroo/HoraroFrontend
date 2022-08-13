import { Box, TextField, Button, InputAdornment } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import PersonIcon from '@material-ui/icons/Person'
import { NavLink } from 'react-router-dom'
const Login = () => {
    return (
        <div className="auth__form-layout">
            <Box component="form" className="auth__form" spacing={2}>
                <h2 className="auth__form-title">Log in</h2>
                <TextField
                    variant="outlined"
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
