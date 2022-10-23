import HeroImage from 'assets/images/layer.png'
import PropTypes from 'prop-types'
const Hero = ({ handleScrollDown }) => {
    return (
        <div className="hero">
            <div className="hero__container">
                <div className="hero__content">
                    <h1 className="hero__title">
                        <div>Horaro -</div>
                        <div>Телеграм бот</div>
                        <div>С расписанием</div>
                    </h1>
                    <p className="hero__desc">
                        Представляем вашему вниманию проект{' '}
                        {process.env.REACT_APP_NAME} (
                        {process.env.REACT_APP_NAME} - «Расписание» в переводе с
                        языка{' '}
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://ru.wikipedia.org/wiki/%D0%AD%D1%81%D0%BF%D0%B5%D1%80%D0%B0%D0%BD%D1%82%D0%BE"
                        >
                            Эсперанто
                        </a>
                        ) предназначенный упростить поиск расписания занятий.{' '}
                        {process.env.REACT_APP_NAME} позволяет пользователям в
                        пару кликов получить актуальное расписание занятий от
                        доверенных пользователей в телеграм боте. Также вам
                        предоставляется возможность создавать и заполнять
                        собственное расписание так, как это удобно именно вам и
                        делиться своим расписанием с другими пользователями{' '}
                        {process.env.REACT_APP_NAME}.
                    </p>
                    <div className="hero__nav">
                        <span>Листай вниз</span>
                        <div
                            className="hero__arrow"
                            onClick={handleScrollDown}
                        ></div>
                    </div>
                </div>
                <div className="hero__preview">
                    <img
                        src={HeroImage}
                        alt="layer-image"
                        className="hero__image"
                    />
                </div>
            </div>
        </div>
    )
}

Hero.propTypes = {
    handleScrollDown: PropTypes.func,
}

export default Hero
