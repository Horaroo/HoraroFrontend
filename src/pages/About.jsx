import React, { useEffect } from 'react'
// Team image
import RostomAva from 'assets/images/team/Rostom.png'
import ArsenAva from 'assets/images/team/Arsen.png'
import JabrailAva from 'assets/images/team/Jabrail.png'
import AxmedAva from 'assets/images/team/Axmed.png'
import useTheme from 'shared/hooks/useTheme'

/*
TODO: 
- сделать цвет текста белым
*/
const team = [
    {
        id: 1,
        img: AxmedAva,
        name: 'Абулайсов Ахмед',
        prof: 'Founder & Backend Developer',
        username: 'abulaysov',
    },
    {
        id: 2,
        img: RostomAva,
        name: 'Вардидзе Ростом',
        prof: 'Co-founder & DevOps',
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
