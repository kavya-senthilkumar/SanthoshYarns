import './NavBrand.css'
import { Link } from 'react-router-dom';
import logo from '../../../asset/Logo.jpg';

const NavBrand = () => {
    return ( 
        <div className='navbrand__container'>
            <h1 className='navbrand'>
                <Link to="/">
                    <img src={logo} alt="Santhosh Yarns Logo" className="brand__logo" />
                </Link>
            </h1>
        </div>
    );
}
 
export default NavBrand;
