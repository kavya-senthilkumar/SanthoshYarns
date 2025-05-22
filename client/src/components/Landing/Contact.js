import './Contact.css';
import { TabTitle } from '../../utils/General';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
    TabTitle("SanthoshYarns");

    return (
        <div className="contact__container">
            <div className="contact__header">
                <h1>Contact Us</h1>
                <p>Get in touch with us for any questions or inquiries</p>
            </div>
            
            <div className="contact__info">
                <div className="contact__info__items">
                    <div className="info__item">
                        <div className="info__icon__wrapper">
                            <FaMapMarkerAlt className="info__icon" />
                        </div>
                        <div className="info__content">
                            <h3>Visit Us</h3>
                            <p>101, Amman Nagar, Minnakkaddu,<br />Mukasipidariyur, Erode - 638051</p>
                        </div>
                    </div>
                    
                    <div className="info__item">
                        <div className="info__icon__wrapper">
                            <FaPhone className="info__icon" />
                        </div>
                        <div className="info__content">
                            <h3>Call Us</h3>
                            <p>+91 98765 43210</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Contact;
