import axios from 'axios'
import localStorageService from 'services/localStorageService'
const defaultOptions = {
    baseURL: process.env.REACT_APP_API_URL,
}
const token = localStorageService.getItem('auth-token')
let instance = axios.create(defaultOptions)
instance.defaults.headers.common['Authorization'] = token
    ? `Token ${token}`
    : null
export const clearToken = async () =>
    (instance.defaults.headers.common['Authorization'] = null)
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
        return instance
            .post(`auth/token/login/`, {
                username,
                password,
            })
            .then((res) => {
                if (res.status === 200) {
                    instance.defaults.headers.common[
                        'Authorization'
                    ] = `Token ${res.data.auth_token}`
                }

                return res
            })
    },
    logout() {
        return instance.post(`/auth/token/logout/`).then((res) => {
            if (res.status === 204) {
                instance.defaults.headers.common['Authorization'] = null
            }
        })
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
        return instance.post(`/auth/detail/users/set_password/`, {
            current_password,
            new_password,
        })
    },
    deleteAccount(password) {
        return instance.delete(`/auth/detail/users/me/`, {
            data: {
                current_password: password,
            },
        })
    },
    getPairTypes() {
        return instance.get(`/type-pair/`)
    },
    postShedule(data) {
        console.log(data)
        return instance.post(`/schedule/`, data)
    },
    getPair(week, day, number, userName) {
        return instance.get(
            `/get-pair/${week}/${day}/${number}/?token=${userName}`
        )
    },
    activation(uid, token) {
        return instance.post(`auth/detail/users/activation/`, {
            uid,
            token,
        })
    },
    getNews() {
        return instance.get(`/events/`)
    },
    clearPair(week, day, number, userName) {
        return instance.delete(
            `/get-pair/${week}/${day}/${number}/?token=${userName}`
        )
    },
    getSheduleDetail({ username, value, type }) {
        // type = subject || teacher || audience

        return instance.get(
            `schedule/detail/${username}/?q=${value}&${type}=true`
        )
    },
}

// Api.postShedule.propTypes = {
//     number_pair: PropTypes.number.isRequired,
//     subject: PropTypes.string.isRequired,
//     teacher: PropTypes.string.isRequired, audience: PropTypes.string.isRequired,
//     week: PropTypes.number.isRequired,
//     group: PropTypes.number.isRequired,
//     type_pair: PropTypes.number.isRequired,
//     day: PropTypes.number.isRequired
// }
