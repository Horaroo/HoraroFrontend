import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    'Access-Control-Allow-Origin': '*',
})

export const Api = {
    register(username, password, group, email) {
        return instance.post(`/auth/detail/users/`, {
            username,
            password,
            group,
            email,
        })
    },
    login(username, password) {
        return instance.post(`auth/token/login/`, {
            username,
            password,
        })
    },
    logout() {
        return instance.get(`/auth/token/logout/`)
    },
    resetPassword(email) {
        return instance.post(`/auth/detail/users/reset_password/`, {
            email,
        })
    },
    setNewPassword(uid, token, newPassword) {
        return instance.post(`/auth/detail/users/reset_password_confirm/`, {
            uid,
            token,
            new_password: newPassword,
        })
    },
}
