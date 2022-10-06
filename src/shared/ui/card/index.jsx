import PropTypes from 'prop-types'
const CardUI = ({ title, description, bgImage, image }) => (
    <div className="card__wrapper" style={{ backgroundImage: bgImage || '' }}>
        <div className="card__content">
            <h2 className="card__title">{title}</h2>
            <p className="card__description">{description}</p>
        </div>
        <div className="card__preview">
            <img src={image} alt="feature-img" className="card__image" />
        </div>
    </div>
)

CardUI.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    bgImage: PropTypes.string,
    image: PropTypes.string,
}

export default CardUI
