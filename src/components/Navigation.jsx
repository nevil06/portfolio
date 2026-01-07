import { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="nav-content">
                    <div className="nav-logo">
                        <span className="gradient-text">Nevil Dsouza</span>
                    </div>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                        <li>
                            <button onClick={() => scrollToSection('home')}>Home</button>
                        </li>
                        <li>
                            <button onClick={() => scrollToSection('about')}>About</button>
                        </li>
                        <li>
                            <button onClick={() => scrollToSection('projects')}>Projects</button>
                        </li>
                        <li>
                            <button onClick={() => scrollToSection('contact')}>Contact</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
