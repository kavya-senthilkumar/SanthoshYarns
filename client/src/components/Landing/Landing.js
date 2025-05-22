import { useEffect } from 'react';
import { TabTitle } from '../../utils/General';
import About from './About';
import Contact from './Contact';
import './Landing.css';

const Landing = () => {
    TabTitle("SanthoshYarns - Premium Yarn Collection");

    useEffect(() => {
        // Add scroll animation observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            {
                threshold: 0.1
            }
        );

        // Observe all sections
        document.querySelectorAll('.section').forEach((section) => {
            observer.observe(section);
        });

        // Add scroll class to navbar
        const handleScroll = () => {
            const nav = document.querySelector('.nav__container');
            if (nav) {
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section id="home" className="section hero-section">
                <div className="hero-content">
                    <h1>Premium Quality Yarns</h1>
                    <p>Discover our extensive collection of cotton, nylon, and polyester yarns</p>
                    <button className="cta-button" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
                        Learn More
                    </button>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="section about-section">
                <About />
            </section>

            {/* Contact Section */}
            <section id="contact" className="section contact-section">
                <Contact />
            </section>
        </div>
    );
};

export default Landing;
