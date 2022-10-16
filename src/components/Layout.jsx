import useAuth from 'shared/hooks/useAuth'
import useTheme from 'shared/hooks/useTheme'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import { customTheme } from 'shared/theme/customTheme'
import { ThemeProvider } from '@mui/material/styles'

const Layout = () => {
    const { user } = useAuth()
    const { scrollFixed } = useTheme()
    return (
        <div className={`layout ${scrollFixed ? 'fixed' : ''}`}>
            <Header />
            {/* <ThemeProvider theme={customTheme}> */}
            <Outlet user={user} />
            {/* </ThemeProvider> */}

            <Footer />
        </div>
    )
}

export default Layout
