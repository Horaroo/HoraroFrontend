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
    const [activeTab, setActiveTab] = useState(1)
    const [numberPair, setNumberPair] = useState(1)
    const [pair, setPair] = useState(null)
    useEffect(() => {
        const getData = async () => {
            console.log('day change: ' + numberPair)
            // const res = get /1/monday/1
            // setPair(res)
        }
        getData()
    }, [activeDay, activeTab, numberPair])

    return (
        <div className="shedule">
            <div className="shedule__sitebar">
                <nav className="shedule__nav">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.value)}
                            className={`shedule__nav-btn ${
                                tab.value === activeTab && 'active'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
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
