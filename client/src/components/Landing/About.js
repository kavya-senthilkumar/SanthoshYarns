import './About.css';
import yarnsImage from '../../asset/img3.jpg';

const About = () => {
    return (
        <div className="about__container section">
            <div className="section-title">
                <h2>About Santhosh Yarns</h2>
                <p>Weaving Quality into Every Thread</p>
            </div>
            
            <div className="about__content">
                <div className="about__text animate-fade-in">
                    <div className="about__cards">
                        <div className="glass-card">
                            <h3>Our Story</h3>
                            <p>
                                Santhosh Yarns is a leading provider of high-quality yarns, committed to delivering excellence and innovation in the textile industry.
                                Founded with a passion for textiles and customer satisfaction, we have been serving businesses with top-grade yarns that meet both local and international standards.
                            </p>
                        </div>
                        
                        <div className="glass-card">
                            <h3>Our Products</h3>
                            <p>
                                Our offerings include a wide range of yarn types suitable for various applications—from garment manufacturing to industrial usage. We pride ourselves on timely delivery, competitive pricing, and unmatched quality assurance.
                            </p>
                        </div>
                        
                        <div className="glass-card">
                            <h3>Our Values</h3>
                            <p>
                                At Santhosh Yarns, we believe in sustainability, ethical business practices, and long-term partnerships. Your success is our mission, and we strive every day to weave a better future together.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="about__image__container animate-fade-in">
                    <img src={yarnsImage} alt="Santhosh Yarns Factory" className="about__image" />
                </div>
            </div>
        </div>
    );
};

export default About;
