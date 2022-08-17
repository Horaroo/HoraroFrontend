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
    { id: 1, name: 'Home', url: '/' },
    { id: 2, name: 'Shedules', url: '/shedules' },
    { id: 3, name: 'About', url: '/about' },
]
import logoIcon from 'assets/images/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { Api } from 'api/Api'
import useAuth from 'hooks/useAuth'
const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const navigate = useNavigate()
    const { logOut, user } = useAuth()

    const onLogoutUser = async () => {
        try {
            navigate('/login')
            logOut()
            await Api.logout()
        } catch (error) {
            console.log(error)
        }
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <AppBar position="static">
            <div className="container">
                <Toolbar
                    disableGutters
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <img className="logo" src={logoIcon} alt="logo" />
                    <Box
                        sx={{
                            flexGrow: 0,
                        }}
                    >
                        {pages.map((page) => (
                            <NavLink to={page.url} key={page.id}>
                                <Button style={{ color: 'white' }}>
                                    {page.name}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0, color: 'white' }}
                            >
                                <Typography
                                    style={{ color: 'white', marginRight: 7 }}
                                >
                                    {user?.username}
                                </Typography>
                                <Avatar
                                    alt={user?.username.toUpperCase()}
                                    src="/static/images/avatar/2.jpg"
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={onLogoutUser}>
                                <Typography>Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </div>
        </AppBar>
    )
}

export default Header
