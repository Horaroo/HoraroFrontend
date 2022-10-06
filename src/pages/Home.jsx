import { useEffect } from 'react'
import useTheme from 'shared/hooks/useTheme'
import PropTypes from 'prop-types'
import { CardUI } from 'shared/ui'
import $ from 'jquery'
import 'shared/libs/jquery.pagepiling'
import 'shared/libs/jquery.pagepiling.css'
// temp
import FeatureImage from 'assets/images/feature-image.png'
import Hero from 'components/Hero/Hero'
//

export const Home = () => {
    const { setHasContainer } = useTheme()
    useEffect(() => {
        setHasContainer(false)
    }, [setHasContainer])

    useEffect(() => {
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
        return () => {
            $('#pp-nav').remove()
        }
    }, [])

    const handleScrollDown = () => {
        $('#pagepiling').pagepiling.moveSectionDown()
    }

    return (
        <div id="pagepiling">
            <div id="pp-tableCeil"></div>
            <Section>
                <Hero handleScrollDown={handleScrollDown} />
            </Section>
            <Section>
                <CardUI
                    title="Команда /quickstart"
                    description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda ducimus aliquam quaerat iste tempora, unde delectus dolore tempore provident optio, neque, laborum non. Dicta ipsam laudantium id perspiciatis numquam! Placeat."
                    image={FeatureImage}
                />
            </Section>
            <Section>
                <CardUI
                    title="Команда /add"
                    description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda ducimus aliquam quaerat iste tempora, unde delectus dolore tempore provident optio, neque, laborum non. Dicta ipsam laudantium id perspiciatis numquam! Placeat."
                    image={FeatureImage}
                />
            </Section>
            <Section>
                <CardUI
                    title="Команда /dell"
                    description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda ducimus aliquam quaerat iste tempora, unde delectus dolore tempore provident optio, neque, laborum non. Dicta ipsam laudantium id perspiciatis numquam! Placeat."
                    image={FeatureImage}
                />
            </Section>
            <Section>
                <CardUI
                    title="Команда /token & /help"
                    description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda ducimus aliquam quaerat iste tempora, unde delectus dolore tempore provident optio, neque, laborum non. Dicta ipsam laudantium id perspiciatis numquam! Placeat."
                    image={FeatureImage}
                />
            </Section>
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
