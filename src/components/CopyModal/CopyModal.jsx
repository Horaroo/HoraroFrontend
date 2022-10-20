import React, { useState } from 'react'
import { Dialog, Button, Tooltip, Select, MenuItem } from '@mui/material'
import { week } from 'shared/mocks/sheduleOptions'
import PropTypes from 'prop-types'
import { Api } from 'shared/api/Api'
import { toast } from 'react-toastify'
const CopyModal = ({ username, open = false, handleClose, activeWeek }) => {
    const [activeType, setActiveType] = useState(3)
    const [selectWeek, setSelectWeek] = useState(
        activeWeek > 3 ? activeWeek - 1 : activeWeek + 1
    )
    const options = [
        { id: 1, type: 'pair', label: 'Пара', copyText: 'эту пару' },
        { id: 2, type: 'dayes', label: 'День', copyText: 'эту день' },
        { id: 3, type: 'week', label: 'Неделя', copyText: 'эту неделю' },
    ]
    const handleCopyShedule = async () => {
        try {
            const res = Api.copyShedule(username, activeWeek, selectWeek)
            toast.success('Данные скопированы!')
            handleClose(false)
        } catch (error) {
            console.log(error)
            toast.error('Данные не скопированы!')
        }
    }

    return (
        <Dialog
            maxWidth="lg"
            onClose={handleClose}
            open={open}
            className="auth__form-layout modal-copy"
        >
            <form className="modal-copy__form">
                <nav className="modal-copy__nav">
                    {options.map((item, index) => (
                        <li
                            key={index}
                            className={`modal-copy__item ${
                                activeType === item.id ? 'active' : 'disabled'
                            } `}
                            onClick={() => {
                                if (item.id === 3) {
                                    setActiveType(item.id)
                                }
                            }}
                        >
                            {item.id === activeType ? (
                                <span>{item.label}</span>
                            ) : (
                                <Tooltip title="Cкоро" placement="bottom">
                                    <span>{item.label}</span>
                                </Tooltip>
                            )}
                        </li>
                    ))}
                </nav>
                <div className="modal-copy__content">
                    <p className="modal-copy__text mb-10">
                        Скопировать{' '}
                        {options[activeType - 1]
                            ? options[activeType - 1]?.copyText
                            : ''}{' '}
                        на:
                    </p>
                    <Select
                        value={selectWeek}
                        onChange={(e) => setSelectWeek(e.target.value)}
                        style={{ fontWeight: '500' }}
                        size="small"
                    >
                        {week.map((value, index) => (
                            <MenuItem
                                key={value.id}
                                value={value.id}
                                style={{
                                    display: `${
                                        activeWeek === value.id && 'none'
                                    }`,
                                }}
                            >
                                {value.label}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div className="modal-copy__btns">
                    <Button
                        className="modal-copy__btn"
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handleCopyShedule}
                    >
                        Скопировать
                    </Button>
                    <Button
                        className="modal-copy__btn"
                        size="small"
                        variant="contained"
                        style={{
                            backgroundColor: 'rgb(211 47 47)',
                            color: 'white',
                        }}
                        onClick={handleClose}
                    >
                        Отмена
                    </Button>
                </div>
            </form>
        </Dialog>
    )
}
CopyModal.propTypes = {
    username: PropTypes.string,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    activeWeek: PropTypes.number.isRequired,
}
export default CopyModal
