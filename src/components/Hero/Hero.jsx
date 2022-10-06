import HeroImage from 'assets/images/layer.png'
import PropTypes from 'prop-types'
const Hero = ({ handleScrollDown }) => {
    return (
        <div className="hero">
            <div className="hero__container">
                <div className="hero__content">
                    <h1 className="hero__title">
                        Horaro - <br /> Телеграм бот <br /> С расписанием
                    </h1>
                    <p className="hero__desc">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Consectetur molestias eligendi iusto minus
                        repellendus praesentium iure enim mollitia delectus
                        deleniti in, ut perferendis maiores fugiat. Amet
                        blanditiis quibusdam alias ducimus?
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
