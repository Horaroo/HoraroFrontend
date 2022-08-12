import { Box, TextField, Button } from '@material-ui/core'
const Login = () => {
    return (
        <div className="auth__form-layout">
            <Box component="form" className="auth__form" spacing={2}>
                <h2 className="auth__form-title">Welcome</h2>
                <TextField
                    type="email"
                    placeholder="email"
                    className="auth__form-input"
                />
                <TextField
                    type="password"
                    placeholder="password"
                    className="auth__form-input"
                />
                <Button color="primary" variant="contained" size="small">
                    Login
                </Button>
            </Box>
        </div>
    )
}

export default Login
