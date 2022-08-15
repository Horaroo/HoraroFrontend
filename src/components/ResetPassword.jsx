import { Box, TextField, Button, InputAdornment } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import EmailIcon from '@material-ui/icons/Email'
import { Api } from 'api/Api'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
const ResetPassword = ({ isSetNewPass }) => {
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { token, uid } = useParams()
    const [isSend, setIsSend] = useState(false)
    const navigate = useNavigate()
    const onSubmit = async () => {
        try {
            setLoading(true)
            if (isSetNewPass) {
                await Api.setNewPassword(uid, token, newPassword)
                navigate('/login')
            } else {
                await Api.resetPassword(email)
                setIsSend(true)
            }

            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    return (
        <div className="auth__form-layout">
            <Box component="form" className="auth__form" spacing={2}>
                <h2 className="auth__form-title">Cброс пароля</h2>
                {!isSetNewPass ? (
                    <div className="auth__form-text w-100">
                        {isSend ? (
                            `На почту ${email} отправлена инструкция для сброса пароля`
                        ) : (
                            <TextField
                                variant="outlined"
                                value={email}
                                onChange={({ target }) =>
                                    setEmail(target.value)
                                }
                                type="text"
                                placeholder="Почта"
                                className="auth__form-input"
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
                        )}
                    </div>
                ) : (
                    <TextField
                        variant="outlined"
                        value={newPassword}
                        onChange={({ target }) => setNewPassword(target.value)}
                        type="text"
                        placeholder="Новый пароль"
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
                )}

                <Button
                    onClick={onSubmit}
                    color="primary"
                    variant="contained"
                    size="large"
                    style={{ marginBottom: 10 }}
                    disabled={isSend}
                >
                    {isSetNewPass ? 'Отправить' : 'Сбросить'}
                </Button>
            </Box>
        </div>
    )
}
ResetPassword.propTypes = {
    isSetNewPass: PropTypes.bool,
}
export default ResetPassword
