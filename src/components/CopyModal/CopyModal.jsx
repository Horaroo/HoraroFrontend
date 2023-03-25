import React, { useCallback, useState } from 'react'
import { Dialog, Button, Select, MenuItem } from '@mui/material'
import { week, dayes, pair } from 'shared/mocks/sheduleOptions'
import PropTypes from 'prop-types'
import { Api } from 'shared/api/Api'
import { toast } from 'react-toastify'
const CopyModal = ({
    open = false,
    handleClose,
    activeWeek,
    activeDay,
    activePair,
    emptyPair,
}) => {
    const [activeType, setActiveType] = useState(3)
    const [state, setState] = useState({
        week: activeWeek > 3 ? activeWeek - 1 : activeWeek + 1,
        day: 'monday',
        pair: activePair,
    })
    const handleSelect = useCallback(({ target }) => {
        const { name, value } = target
        setState((prevState) => ({ ...prevState, [name]: value }))
    }, [])

    const options = [
        {
            id: 1,
            type: 'pair',
            label: 'Пара',
            copyText: 'эту пару',
            disabled: emptyPair,
        },
        { id: 2, type: 'dayes', label: 'День', copyText: 'этот день' },
        { id: 3, type: 'week', label: 'Неделя', copyText: 'эту неделю' },
    ]
    const handleCopyShedule = async () => {
        const { week, day } = state
        let options = {}
        try {
            switch (activeType) {
                case 3:
                    options = {
                        source_week: activeWeek,
                        target_week: week,
                    }
                    break
                case 2:
                    options = {
                        source_week: activeWeek,
                        source_day: activeDay,
                        target_week: week,
                        target_day: day,
                    }
                    break
                case 1:
                    options = {
                        source_week: activeWeek,
                        source_day: activeDay,
                        source_pair: activePair,
                        target_week: week,
                        target_day: day,
                        target_pair: 1,
                    }
                    break

                default:
                    break
            }
            const res = Api.postCopyShedule(options)
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
                                item.id === activeType
                                    ? 'active'
                                    : item.disabled
                                    ? 'disabled'
                                    : ''
                            }`}
                            onClick={() => {
                                if (!item.disabled) setActiveType(item.id)
                            }}
                        >
                            <span>{item.label}</span>
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
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                        }}
                    >
                        <Select
                            value={state.pair}
                            name="pair"
                            onChange={handleSelect}
                            style={{
                                display: activeType !== 1 ? 'none' : '',
                                fontWeight: '500',
                            }}
                            size="small"
                        >
                            {pair.map((value, index) => (
                                <MenuItem key={value.id} value={value.id}>
                                    {value.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select
                            value={state.day}
                            name="day"
                            onChange={handleSelect}
                            style={{
                                display: activeType === 3 ? 'none' : '',
                                fontWeight: '500',
                            }}
                            size="small"
                        >
                            {dayes.map((value, index) => (
                                <MenuItem key={value.name} value={value.name}>
                                    {value.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select
                            value={state.week}
                            name="week"
                            onChange={handleSelect}
                            style={{ fontWeight: '500' }}
                            size="small"
                        >
                            {week.map((value, index) => (
                                <MenuItem
                                    key={value.id}
                                    value={value.id}
                                    style={{
                                        display: `${
                                            activeType === 3 &&
                                            activeWeek === value.id &&
                                            'none'
                                        }`,
                                    }}
                                >
                                    {value.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
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
    emptyPair: PropTypes.bool,
    handleClose: PropTypes.func,
    activeWeek: PropTypes.number.isRequired,
    activeDay: PropTypes.number.isRequired,
    activePair: PropTypes.number.isRequired,
}
export default CopyModal
