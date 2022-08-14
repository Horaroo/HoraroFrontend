import { useCallback, useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'
import { AuthContext } from 'contexts/AuthContext'
import PropTypes from 'prop-types'
function AuthProvider(props) {
    const [user, setUserData] = useState(null)
    const [token, setTokenData] = useState(Cookies.get('auth-token') || null)

    const setToken = useCallback(
        (tokenData) => {
            setTokenData(tokenData)
            if (tokenData) {
                Cookies.set('auth-token', tokenData)
            } else {
                Cookies.remove('auth-token')
            }
        },
        [setTokenData]
    )
    const setUser = useCallback(
        (userData) => {
            setUserData(userData)
            if (userData) {
                Cookies.set('auth-user', JSON.stringify(userData))
            } else {
                Cookies.remove('auth-user')
            }
        },
        [setUserData]
    )

    const logOut = useCallback(() => {
        setUser(null)
        setToken(null)
    }, [setToken, setUser])

    useEffect(() => {
        const user = Cookies.get('auth-user')
        if (user) setUserData(JSON.parse(user))
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
