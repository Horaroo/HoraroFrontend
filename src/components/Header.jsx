import { useState } from 'react'
import { Typography, Avatar } from '@material-ui/core'
import logoIcon from 'assets/images/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from 'hooks/useAuth'
import Modal from './Modal/Modal'
import { Api } from 'api/Api'

const pages = [
    { id: 1, name: 'Расписания', url: '/' },
    { id: 2, name: 'О нас', url: '/' },
]

const Header = () => {
    const navigate = useNavigate()
    const { logOut, user } = useAuth()
    const [openDropdown, setOpenDropdown] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [activeType, setActiveType] = useState(null)
    const types = ['change', 'delete']
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
    const handleClose = () => {
        setOpenModal(false)
    }
    return (
        <header className="header">
            <div className="container header__container">
                <div className="header__logo">
                    <img className="logo" src={logoIcon} alt="logo" />
                </div>
                <nav className="header__menu">
                    <ul className="header__menu-list">
                        {pages?.map((item) => {
                            return (
                                <NavLink
                                    className="header__nav-link"
                                    key={item.id}
                                    to={item.url}
                                >
                                    {item.name}
                                </NavLink>
                            )
                        })}
                    </ul>
                </nav>

                <div className="header__profile">
                    <Typography
                        className="header__profile-name"
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
                <div className={`dropdown ${!openDropdown && 'none'} `}>
                    <ul className="dropdown__list">
                        <li onClick={onLogoutUser} className="dropdown__item">
                            Выйти
                        </li>
                        <li
                            onClick={() => {
                                setOpenModal(true)
                                setActiveType('change')
                            }}
                            className="dropdown__item"
                        >
                            Сменить пароль
                        </li>
                        <li
                            onClick={() => {
                                setOpenModal(true)
                                setActiveType('delete')
                            }}
                            className="dropdown__item"
                            style={{ color: 'red' }}
                        >
                            Удалить аккаунт
                        </li>
                    </ul>
                </div>
            </div>
            <Modal
                open={openModal}
                handleClose={handleClose}
                activeType={activeType}
                isChangePass={activeType === 'change'}
            />
        </header>
    )
}

export default Header
