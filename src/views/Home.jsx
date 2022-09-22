import React, { useEffect } from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import horaroImage from 'assets/images/horaro-image.png'
import useTheme from 'hooks/useTheme'
import { width } from 'global'

const data = [
    {
        id: 1,
        title: 'Приветствуем!',
        description: `Используя наше приложение, вы можете заполнять раcписание своей группы, а также отслеживать расписание других групп.`,
        features: [
            {
                id: 1,
                title: 'Как пользоваться.',
                image: horaroImage,
            },
            {
                id: 2,
                title: 'Контакты.',
                image: horaroImage,
            },
            {
                id: 3,
                title: 'Команда разработчиков приложения',
                image: horaroImage,
            },
        ],
    },
]
const Home = () => {
    const { setScrollFixed } = useTheme()
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    // const [data, setData] = useState([])
    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const { data } = await Api.getNews()
    //             setData(data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     getData()
    // }, [setData])

    useEffect(() => {
        if (width < 768) {
            setScrollFixed(false)
            const footer = document.querySelector('.footer')
            footer.style.position = 'relative'
            return () => {
                footer.style.position = 'fixed'
                setScrollFixed(true)
            }
        }
    }, [setScrollFixed])

    return (
        <div className="page home">
            <Slider {...settings} className="slider">
                {data.map((item) => (
                    <SliderContent {...item} key={item.id} />
                ))}
            </Slider>
        </div>
    )
}

const SliderContent = ({ id, title, features, description }) => {
    return (
        <div className="slider__content">
            <h2 className="slider__title">{title}</h2>
            <p className="slider__text">{description}</p>
            <div className="slider__features">
                {features &&
                    features.map((item) => (
                        <div key={item.id} className="slider__item">
                            <div className="slider__item-top">
                                <strong className="slider__item-number">
                                    {item.id}
                                </strong>
                                <p className="slider__item-text">
                                    {item.title}
                                </p>
                            </div>

                            {item.image && (
                                <div className="slider__item-preview">
                                    <div className="cover">
                                        <span>Скоро</span>
                                    </div>
                                    <img
                                        src={item.image}
                                        alt="slider__item-image"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    )
}
SliderContent.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    features: PropTypes.array,
    description: PropTypes.string,
}
export default Home
