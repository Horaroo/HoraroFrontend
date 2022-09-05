import useAuth from 'hooks/useAuth'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const Layout = () => {
    const { user } = useAuth()
    return (
        <div className="layout">
            <Header />
            <div className="layout__container">
                <Outlet user={user} />
            </div>
            <Footer />
        </div>
    )
}

export default Layout
