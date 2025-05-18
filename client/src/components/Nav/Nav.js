import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    const location = useLocation();
    const isMainPage = location.pathname === '/';

    const handleSmoothScroll = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <nav className="nav__container">
            <div className="nav__links">
                {isMainPage ? (
                    <>
                        {/* Smooth scroll links for main page */}
                        <a href="#home" className="nav__link" onClick={(e) => handleSmoothScroll(e, 'home')}>
                            Home
                        </a>
                        <a href="#about" className="nav__link" onClick={(e) => handleSmoothScroll(e, 'about')}>
                            About
                        </a>
                        <a href="#contact" className="nav__link" onClick={(e) => handleSmoothScroll(e, 'contact')}>
                            Contact
                        </a>
                    </>
                ) : (
                    <>
                        {/* Regular links for other pages */}
                        <Link to="/#home" className="nav__link">Home</Link>
                        <Link to="/#about" className="nav__link">About</Link>
                        <Link to="/#contact" className="nav__link">Contact</Link>
                    </>
                )}

                {/* Regular route links */}
                <Link to="/shop" className="nav__link">
                    Shop
                </Link>
            </div>
        </nav>
    );
}

export default Nav; 