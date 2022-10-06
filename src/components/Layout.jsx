import useAuth from 'shared/hooks/useAuth'
import useTheme from 'shared/hooks/useTheme'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const Layout = () => {
    const { user } = useAuth()
    const { scrollFixed } = useTheme()
    return (
        <div className={`layout ${scrollFixed ? 'fixed' : ''}`}>
            <Header />
            <Outlet user={user} />
            <Footer />
        </div>
    )
}

export default Layout
