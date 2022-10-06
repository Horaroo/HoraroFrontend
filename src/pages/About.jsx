import React, { useEffect } from 'react'
// Team image
import RostomAva from 'assets/images/team/Rostom.png'
import ArsenAva from 'assets/images/team/Arsen.png'
import JabrailAva from 'assets/images/team/Jabrail.png'
import AxmathanAva from 'assets/images/team/Axmathan.png'
import AxmedAva from 'assets/images/team/Axmed.png'
import useTheme from 'shared/hooks/useTheme'

const team = [
    {
        id: 1,
        img: AxmedAva,
        name: 'Абулайсов Ахмед',
        prof: 'Python Backend Developer',
        username: 'abulaysov',
    },
    {
        id: 2,
        img: RostomAva,
        name: 'Вардидзе Ростом',
        prof: 'Linux System Administrator',
        username: 'TotSamyi888',
    },
    {
        id: 3,
        img: ArsenAva,
        name: 'Эскендеров Арсен',
        prof: 'Frontend Developer',
        username: 'arsen_esk',
    },
    {
        id: 4,
        img: AxmathanAva,
        name: 'Умаев Ахматхан',
        prof: 'Python Backend Developer',
        username: 'ahmadum01',
    },
    {
        id: 5,
        img: JabrailAva,
        name: 'Насрутдинов Джабраил',
        prof: 'Designer',
        username: 'jabraildesign',
    },
]
const About = () => {
    const { setScrollFixed } = useTheme()
    useEffect(() => {
        setScrollFixed(false)
        const footer = document.querySelector('.footer')
        footer.style.position = 'relative'
        return () => {
            footer.style.position = 'fixed'
            setScrollFixed(true)
        }
    }, [setScrollFixed])
    return (
        <div className="layout__container">
            <div className="page about">
                <h2 className="about__title">О проекте</h2>
                <p className="about__text">
                    Представляем вашему вниманию проект{' '}
                    {process.env.REACT_APP_NAME} ({process.env.REACT_APP_NAME} -
                    «Расписание» в переводе с языка{' '}
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://ru.wikipedia.org/wiki/%D0%AD%D1%81%D0%BF%D0%B5%D1%80%D0%B0%D0%BD%D1%82%D0%BE"
                    >
                        Эсперанто
                    </a>
                    ) предназначенный упростить поиск расписания занятий.{' '}
                    {process.env.REACT_APP_NAME} позволяет пользователям в пару
                    кликов получить актуальное расписание занятий от доверенных
                    пользователей в телеграм боте. Также вам предоставляется
                    возможность создавать и заполнять собственное расписание
                    так, как это удобно именно вам и делиться своим расписанием
                    с другими пользователями {process.env.REACT_APP_NAME}.
                </p>
                <div className="about__team">
                    <h3 className="about__team-title">Наша команда</h3>
                    <div className="about__list">
                        {team.map((u) => {
                            return (
                                <div key={u.id} className="about__card">
                                    <div className="about__card-preview">
                                        <img
                                            src={u.img}
                                            alt="аватарка разработчика"
                                        />
                                    </div>
                                    <div className="about__card-content">
                                        <div className="about__card-name">
                                            {u.name}
                                        </div>
                                        <div className="about__card-prof">
                                            {u.prof}
                                        </div>
                                        <div className="about__card-social">
                                            <a
                                                rel="noreferrer"
                                                target="_blank"
                                                href={`https://t.me/${u.username}`}
                                                className="about__card-social-link"
                                            >
                                                <svg
                                                    width="24px"
                                                    height="24px"
                                                    viewBox="0 0 24 24"
                                                    role="img"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.27-.84-.95L6.3 13.7l-5.45-1.7c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.53 1.73z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
