import { Link, useLocation } from 'react-router-dom';
import './NavLinks.css'

const NavLinks = () => {
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
        <nav className="nav__bottom__container">
            <div className="bottom__container">
                <ul className="nav">
                    <li className='nav-link'>
                        {isMainPage ? (
                            <a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')}>Home</a>
                        ) : (
                            <Link to="/#home">Home</Link>
                        )}
                    </li>
                    <li className='nav-link'>
                        {isMainPage ? (
                            <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')}>About</a>
                        ) : (
                            <Link to="/#about">About</Link>
                        )}
                    </li>
                    <li className='nav-link'><Link to="/shop">Shop</Link></li>
                    <li className='nav-link'>
                        {isMainPage ? (
                            <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')}>Contact</a>
                        ) : (
                            <Link to="/#contact">Contact</Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}
 
export default NavLinks;