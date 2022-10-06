import { MenuItem, Select } from '@mui/material'
import { Api } from 'shared/api/Api'
import SheduleItem from 'components/SheduleItem/SheduleItem'
import { dayes, week } from 'shared/mocks/sheduleOptions'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const handleSubmit = () => {}
const Shedule = ({ user }) => {
    const [activeDay, setActiveDay] = useState(1)
    const [activeWeek, setActiveWeek] = useState(1)
    const [numberPair, setNumberPair] = useState(1)
    const [pairTypes, setPairTypes] = useState([])
    const [pair, setPair] = useState(null)
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await Api.getPairTypes()
                if (res.status === 200) setPairTypes(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    const handleChange = (event) => {
        setNumberPair(1)
        setActiveDay(event.target.value)
    }

    return (
        <div className="layout__container">
            <div className="page shedule">
                <div className="shedule__sitebar">
                    <nav className="shedule__nav">
                        {week.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveWeek(tab.value)}
                                className={`shedule__nav-btn ${
                                    tab.value === activeWeek && 'active'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                    <Select
                        className="shedule__select shedule__select-nav"
                        value={activeWeek}
                        onChange={(e) => setActiveWeek(e.target.value)}
                        size="small"
                    >
                        {week.map((tab) => (
                            <MenuItem key={tab.id} value={tab.id}>
                                {tab.label}
                            </MenuItem>
                        ))}
                    </Select>

                    <Select
                        className="shedule__select shedule__select-dayes"
                        value={activeDay}
                        onChange={handleChange}
                        size="small"
                    >
                        {dayes.map((day) => (
                            <MenuItem
                                className="shedule__select-item"
                                key={day.id}
                                value={day.id}
                            >
                                {day.label}
                            </MenuItem>
                        ))}
                    </Select>
                    <div className="shedule__dayes">
                        <ul className="shedule__dayes-list">
                            {dayes.map((day) => (
                                <li
                                    key={day.id}
                                    onClick={() => {
                                        setNumberPair(1)
                                        setActiveDay(day.value)
                                    }}
                                    className={`shedule__dayes-item ${
                                        day.value === activeDay && 'active'
                                    }`}
                                >
                                    {day.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <main className="shedule__content">
                    <SheduleItem
                        pair={pair}
                        numberPair={numberPair}
                        activeWeek={activeWeek}
                        pairTypes={pairTypes}
                        activeDay={activeDay}
                        setNumberPair={setNumberPair}
                        handleSubmit={handleSubmit}
                    />
                </main>
            </div>
        </div>
    )
}
Shedule.propTypes = {
    user: PropTypes.object,
}
export default Shedule
