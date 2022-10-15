import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer__container">
                <nav className="footer__nav">
                    <Link to="/about" className="footer__link">
                        О нас
                    </Link>
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://t.me/horaroBot"
                        className="footer__link"
                    >
                        Телеграм бот
                    </a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer
