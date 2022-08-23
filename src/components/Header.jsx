import { useState } from 'react'
import {
    Toolbar,
    Typography,
    Box,
    IconButton,
    Tooltip,
    Avatar,
    Menu,
    MenuItem,
    AppBar,
    Button,
} from '@material-ui/core'

const pages = [
    { id: 1, name: 'Расписания', url: '/' },
    { id: 2, name: 'О нас', url: '/' },
]
import logoIcon from 'assets/images/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { Api } from 'api/Api'
import useAuth from 'hooks/useAuth'
const Header = () => {
    const navigate = useNavigate()
    const { logOut, user } = useAuth()
    const [openDropdown, setOpenDropdown] = useState(false)
    const onLogoutUser = async () => {
        try {
            navigate('/login')
            logOut()
            await Api.logout()
        } catch (error) {
            console.log(error)
        }
    }
    const handleOpenUserMenu = () => {
        setOpenDropdown(!openDropdown)
    }

    return (
        <AppBar position="static" className="header">
            <div className="container header__container">
                <Toolbar
                    disableGutters
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        height: 73,
                    }}
                >
                    <img className="logo" src={logoIcon} alt="logo" />
                    <Box
                        sx={{
                            flexGrow: 0,
                            height: 75,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {pages.map((page) => (
                            <NavLink
                                to={page.url}
                                key={page.id}
                                className="header__nav-link"
                            >
                                {page.name}
                            </NavLink>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <div className="header__profile">
                            <Typography
                                style={{ color: 'white', marginRight: 7 }}
                            >
                                {user?.username}
                            </Typography>
                            <Avatar
                                onClick={handleOpenUserMenu}
                                className="header__avatar"
                                alt={user?.username.toUpperCase()}
                                src="/static/images/avatar/2.jpg"
                            />
                        </div>

                        <div className={`dropdown ${!openDropdown && 'none'}`}>
                            <ul className="dropdown__list">
                                <li
                                    onClick={() => navigate('/profile')}
                                    className="dropdown__item"
                                >
                                    Профиль
                                </li>
                                <li
                                    onClick={onLogoutUser}
                                    className="dropdown__item"
                                >
                                    Выйти
                                </li>
                            </ul>
                        </div>
                    </Box>
                </Toolbar>
            </div>
        </AppBar>
    )
}

export default Header
