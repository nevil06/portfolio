import { SOCIAL_LINKS } from '../utils/constants';
import './Footer.css';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="gradient-text">Nevil Dsouza</h3>
                        <p>Full Stack Developer</p>
                    </div>

                    <div className="footer-section">
                        <h4>Connect</h4>
                        <div className="footer-links">
                            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </a>
                            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
                                Instagram
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <button onClick={scrollToTop} className="back-to-top">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 15l-6-6-6 6" />
                            </svg>
                            Back to Top
                        </button>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Nevil Dsouza. All rights reserved.</p>
                    <p>Built with React & ❤️</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
