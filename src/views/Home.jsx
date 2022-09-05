import { MenuItem, Select } from '@material-ui/core'
import SheduleItem from 'components/SheduleItem/SheduleItem'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
const dayes = [
    { id: 1, label: 'Понедельник', value: 1 },
    { id: 2, label: 'Вторник', value: 2 },
    { id: 3, label: 'Среда', value: 3 },
    { id: 4, label: 'Четверг', value: 4 },
    { id: 5, label: 'Пятница', value: 5 },
    { id: 6, label: 'Суббота', value: 6 },
]
const tabs = [
    { id: 1, label: '1нед.', value: 1 },
    { id: 2, label: '2нед.', value: 2 },
    { id: 3, label: '3нед.', value: 3 },
    { id: 4, label: '4нед.', value: 4 },
]
const handleSubmit = () => {}
const Home = ({ user }) => {
    const [activeDay, setActiveDay] = useState(1)
    const [activeWeek, setActiveWeek] = useState(1)
    const [numberPair, setNumberPair] = useState(1)
    const [pair, setPair] = useState(null)
    console.log(user)
    useEffect(() => {
        const getData = async () => {
            console.log('day change: ' + numberPair)
            // const res = get /1/monday/1
            // setPair(res)
        }
        getData()
    }, [activeDay, activeWeek, numberPair])

    const handleChange = (event) => {
        setActiveDay(event.target.value)
    }

    return (
        <div className="shedule">
            <div className="shedule__sitebar">
                <nav className="shedule__nav">
                    {tabs.map((tab) => (
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
                >
                    {tabs.map((tab) => (
                        <MenuItem key={tab.id} value={tab.id}>
                            {tab.label}
                        </MenuItem>
                    ))}
                </Select>

                <Select
                    className="shedule__select shedule__select-dayes"
                    value={activeDay}
                    label="Age"
                    onChange={handleChange}
                    style={{ border: '1px solid red' }}
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
                            <NavLink key={day.id} to="/">
                                <li
                                    onClick={() => setActiveDay(day.value)}
                                    className={`shedule__dayes-item ${
                                        day.value === activeDay && 'active'
                                    }`}
                                >
                                    {day.label}
                                </li>
                            </NavLink>
                        ))}
                    </ul>
                </div>
            </div>
            <main className="shedule__content">
                <SheduleItem
                    pair={pair}
                    numberPair={numberPair}
                    activeWeek={activeWeek}
                    activeDay={activeDay}
                    setNumberPair={setNumberPair}
                    handleSubmit={handleSubmit}
                />
            </main>
        </div>
    )
}
Home.propTypes = {
    user: PropTypes.object,
}
export default Home
