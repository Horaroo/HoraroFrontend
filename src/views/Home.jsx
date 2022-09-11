import React from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import ImageAbout from 'assets/images/home/1.png'
const data = [
    {
        id: 1,
        title: 'Фронтенд',
        desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam sit, reprehenderit, facilis laborum amet quod libero et cupiditate ut corrupti ab vitae repellat quas quis quaerat voluptatem ex nostrum porro`,
        features: [
            {
                id: 1,
                title: 'Добавили возможность подтверждение почты',
                image: null,
            },
            {
                id: 2,
                title: 'Добавлена страница  <О нас>',
                image: ImageAbout,
            },
            {
                id: 3,
                title: 'Добавлена страница <Главная>',
                image: null,
            },
        ],
    },
    {
        id: 2,
        title: 'Бэкенд',
        desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam sit, reprehenderit, facilis laborum amet quod libero et cupiditate ut corrupti ab vitae repellat quas quis quaerat voluptatem ex nostrum porro`,
        features: [
            {
                id: 1,
                title: 'Добавили возможность подтверждение почты',
                image: null,
            },
            {
                id: 2,
                title: 'Добавлена страница <О нас>',
                image: null,
            },
            {
                id: 3,
                title: 'Добавлена страница <Главная>',
                image: null,
            },
        ],
    },
]
const Home = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
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

const SliderContent = ({ id, title, features, desc }) => {
    return (
        <div className="slider__content">
            <h2 className="slider__title">{title}</h2>
            <p className="slider__text">{desc}</p>
            <div className="slider__features">
                {features &&
                    features.map((item) => (
                        <div key={item.id} className="slider__item">
                            <strong className="slider__item-number">
                                {item.id}
                            </strong>
                            <p className="slider__item-text">{item.title}</p>
                            {item.image && (
                                <div className="slider__item-preview">
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
    title: PropTypes.object,
    features: PropTypes.array,
    desc: PropTypes.string,
}
export default Home
