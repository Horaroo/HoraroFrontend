import PropTypes from 'prop-types'

const Home = ({ user }) => {
    return (
        <div>
            <h1>Hello world!</h1>
        </div>
    )
}
Home.propTypes = {
    user: PropTypes.object,
}
export default Home
