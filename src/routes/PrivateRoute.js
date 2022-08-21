import { Navigate, useLocation } from 'react-router-dom'
import useAuth from 'hooks/useAuth'
import PropTypes from 'prop-types'

function PrivateRoute({ children }) {
    const auth = useAuth()
    const location = useLocation()
    const url = new URLSearchParams()

    url.set('redirect', location.pathname)
    return auth.token ? (
        children
    ) : (
        <Navigate
            to={{
                pathname: '/login',
            }}
        />
    )
}
PrivateRoute.propTypes = {
    children: PropTypes.element.isRequired,
}
export default PrivateRoute
