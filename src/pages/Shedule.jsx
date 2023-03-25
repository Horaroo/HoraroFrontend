import { MenuItem, Select } from '@mui/material'
import { Api } from 'shared/api/Api'
import SheduleContent from 'components/Shedule/SheduleContent/SheduleContent'
import { dayes, week } from 'shared/mocks/sheduleOptions'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import useTheme from 'shared/hooks/useTheme'

const handleSubmit = () => {}
const Shedule = ({ user }) => {
    const [windowDimenion, detectHW] = useState({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
    })
    const [activeDay, setActiveDay] = useState('monday')
    const [activeWeek, setActiveWeek] = useState(1)
    const [numberPair, setNumberPair] = useState(1)
    const [pairTypes, setPairTypes] = useState([])
    const [pair, setPair] = useState(null)
    const { setScrollFixed } = useTheme()
    
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

    useEffect(() => {
        const footer = document.querySelector('.footer')
        if (windowDimenion?.winWidth < 850) {
            setScrollFixed(false)
            footer.style.position = 'relative'
        }

        return () => {
            footer.style.position = 'fixed'
            setScrollFixed(true)
        }
    }, [setScrollFixed, windowDimenion])

    const handleChange = (event) => {
        setNumberPair(1)
        setActiveDay(event.target.value)
    }

    return (
        <div className="layout__container">
            <div className="page shedule">
                <div className="shedule__top">
                    <ul className="shedule__list">
                        {week.map((tab) => (
                            <li
                                key={tab.id}
                                onClick={() => {
                                    setNumberPair(1)
                                    setActiveWeek(tab.value)
                                }}
                                className={`shedule__item ${
                                    tab.value === activeWeek && 'active'
                                }`}
                            >
                                {tab.label}
                            </li>
                        ))}
                    </ul>
                    <Select
                        className="form__select shedule__select shedule__select-nav"
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
                        className="form__select  shedule__select shedule__select-dayes"
                        value={activeDay}
                        onChange={handleChange}
                        size="small"
                    >
                        {dayes.map((day) => (
                            <MenuItem
                                className="shedule__select-item"
                                key={day.name}
                                value={day.name}
                            >
                                {day.label}
                            </MenuItem>
                        ))}
                    </Select>
                    <div className="shedule__dayes">
                        <ul className="shedule__list">
                            {dayes.map((day) => (
                                <li
                                    key={day.name}
                                    onClick={() => {
                                        setNumberPair(1)
                                        setActiveDay(day.name)
                                    }}
                                    className={`shedule__item ${
                                        day.name === activeDay && 'active'
                                    }`}
                                >
                                    {day.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <main className="shedule__content">
                    <SheduleContent
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
