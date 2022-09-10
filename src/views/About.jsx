import React from 'react'
import UserIcon from 'assets/images/user.png'
import TelegramIcon from 'assets/images/telegram.svg'
// Team image
import RostomAva from 'assets/images/team/Rostom.png'

const team = [
    {
        id: 1,
        img: UserIcon,
        name: 'Абулайсов Ахмед',
        prof: 'Backend',
        username: 'abulaysov',
    },
    {
        id: 2,
        img: RostomAva,
        name: 'Вардидзе Ростом',
        prof: 'DevOps',
        username: 'TotSamyi888',
    },
    {
        id: 3,
        img: UserIcon,
        name: 'Эсендеров Арсен',
        prof: 'Frontend',
        username: 'arsen_esk',
    },
    {
        id: 4,
        img: UserIcon,
        name: 'Умаев Ахмат',
        prof: 'Backend',
        username: 'ahmadum01',
    },
    {
        id: 5,
        img: UserIcon,
        name: 'Насрутдинов Джабраил',
        prof: 'Designer',
        username: 'jabraildesign',
    },
]
const About = () => {
    return (
        <div className="page about">
            <h2 className="about__title">О проекте</h2>
            <p className="about__text">
                Представляем вашему вниманию проект [название проекта],
                предназначенный упростить поиск расписания занятий. [название
                проекта] позволяет пользователям в пару кликов получить
                актуальное расписание занятий от доверенных пользователей в
                телеграмм боте. Также вам предоставляется возможность создавать
                и заполнять собственное расписание так, как это удобно именно
                вам и делиться своим расписанием с другими пользователями
                [название проекта].
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
    )
}

export default About
