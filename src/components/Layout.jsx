import useAuth from 'hooks/useAuth'
import useTheme from 'hooks/useTheme'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const Layout = () => {
    const { user } = useAuth()
    const { scrollFixed } = useTheme()
    return (
        <div className={`layout ${scrollFixed ? 'fixed' : ''}`}>
            <Header />
            <div className="layout__container">
                <Outlet user={user} />
            </div>
            <Footer />
        </div>
    )
}

export default Layout
