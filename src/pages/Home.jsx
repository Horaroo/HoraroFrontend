import { useEffect, useState } from 'react'
import useTheme from 'shared/hooks/useTheme'
import PropTypes from 'prop-types'
import { CardUI } from 'shared/ui'
import $ from 'jquery'
import 'shared/libs/jquery.pagepiling'
import 'shared/libs/jquery.pagepiling.css'
import Hero from 'components/Hero/Hero'
import { Api } from 'shared/api/Api'

export const Home = () => {
    const { setHasContainer } = useTheme()
    const [events, setEvents] = useState([])
    useEffect(() => {
        setHasContainer(false)
    }, [setHasContainer])
    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await Api.getEvents()
                setEvents(data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        if (events.length) {
            $('#pagepiling').pagepiling({
                sectionsColor: [
                    '#273953',
                    '#252849',
                    '#2F636F',
                    '#273953',
                    '#23356B',
                ],
                navigation: {
                    position: 'right',
                },
                afterRender: function () {
                    $('#pp-nav').addClass('dots-slider')
                },
            })
        }
        return () => {
            $('#pp-nav').remove()
        }
    }, [events.length])

    const handleScrollDown = () => {
        $('#pagepiling').pagepiling.moveSectionDown()
    }

    return (
        <div id="pagepiling">
            <div id="pp-tableCeil"></div>
            <Section>
                <Hero handleScrollDown={handleScrollDown} />
            </Section>
            {events?.map((e, index) => (
                <Section key={index}>
                    <CardUI
                        title={e.title}
                        description={e.description}
                        image={`https://${e.picture}`}
                    />
                </Section>
            ))}
        </div>
    )
}

const Section = ({ children }) => (
    <div className="section">
        <div className="layout__container pagepiling__container">
            {children}
        </div>
    </div>
)
Section.propTypes = {
    children: PropTypes.node.isRequired,
}
