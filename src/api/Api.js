import axios from 'axios'
import Cookies from 'js-cookie'

const defaultOptions = {
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Authorization: getToken(),
        'Content-Type': 'application/x-www-form-urlencoded',
    },
}

let instance = axios.create(defaultOptions)
const getToken = () => {
    const token = Cookies.get('auth-token')
    return `Token ${String(token)}`
}

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
        return instance.post(`/auth/token/logout/`)
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
    searchGroup(searchValue) {
        return instance.get(`/group/`, {
            params: { q: searchValue },
        })
    },
    changePassword(current_password, new_password) {
        console.log(getToken())
        return instance.post(`/auth/detail/users/set_password/`, {
            data: {
                current_password,
                new_password,
            },
        })
    },
    deleteAccount(current_password) {
        return instance.delete(`/auth/detail/users/me/`, {
            current_password,
            headers: getToken(),
        })
    },
}
