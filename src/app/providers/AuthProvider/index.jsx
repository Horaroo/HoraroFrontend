import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from 'contexts/AuthContext'
import PropTypes from 'prop-types'
import localStorageService from 'shared/services/localStorageService'
function AuthProvider(props) {
    const [user, setUserData] = useState(null)
    const [token, setTokenData] = useState(
        localStorageService.getItem('auth-token') || null
    )

    const setToken = useCallback(
        (tokenData) => {
            setTokenData(tokenData)
            if (tokenData) {
                localStorageService.setItem('auth-token', tokenData)
            } else {
                localStorage.removeItem('auth-token')
            }
        },
        [setTokenData]
    )
    const setUser = useCallback(
        (userData) => {
            setUserData(userData)
            if (userData) {
                localStorageService.setItem('auth-user', userData)
            } else {
                localStorage.removeItem('auth-user')
            }
        },
        [setUserData]
    )

    const logOut = useCallback(() => {
        setUser(null)
        setToken(null)
    }, [setToken, setUser])

    useEffect(() => {
        const user = localStorageService.getItem('auth-user')
        if (user) setUserData(user)
    }, [setUserData])
    const contextValue = useMemo(
        () => ({
            user,
            token,
            setUser,
            setToken,
            logOut,
        }),
        [user, token, setToken, logOut, setUser]
    )

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}
AuthProvider.propTypes = {
    children: PropTypes.element.isRequired,
}
export default AuthProvider
