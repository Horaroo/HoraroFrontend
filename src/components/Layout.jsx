import useAuth from 'hooks/useAuth'
import React from 'react'

const Layout = () => {
    const { user } = useAuth()
    return <div>Hello {user?.username}</div>
}

export default Layout
