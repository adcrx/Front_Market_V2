import '../assets/css/Footer.css';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
// Importa los iconos de las redes sociales
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">

                <div className="copyright">
                    TREND'S 2025 
                </div>

                <div className="social-container">
                    <p>Encuentranos en:</p>
                    
                    <div className="social-links">
                        <a href="https://x.com/" aria-label="Twitter">
                            <FaTwitter />
                        </a>
                        <a href="https://www.facebook.com/" aria-label="Facebook">
                            <FaFacebook />
                        </a>
                        <a href="https://www.instagram.com/" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
