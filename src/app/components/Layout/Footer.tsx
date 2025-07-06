// src/app/components/Layout/Footer.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; // CSS file for the Footer

const Footer: React.FC = () => {
  return (
    <footer className="main-footer mt-5 pt-5 pb-3">
      <Container>
        {/* Section 2: Main Navigation Columns */}
        <Row className="footer-links-row mb-4">
          {/* Column 1: BLITXPRESS */}
          <Col xs={6} md={3} lg={2} className="mb-3">
            <h5 className="footer-heading">BLITXPRESS</h5>
            <ul className="list-unstyled footer-links">
              <li><a href="#" className="footer-link">About Blitxpress</a></li>
              <li><a href="#" className="footer-link">Blitxpress Express</a></li>
              <li><a href="#" className="footer-link">Blitxpress Global</a></li>
              <li><a href="#" className="footer-link">Careers</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
              <li><a href="#" className="footer-link">Tech & Innovation</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Terms & Conditions</a></li>
            </ul>
          </Col>

          {/* Column 2: HELP CENTER */}
          <Col xs={6} md={3} lg={2} className="mb-3">
            <h5 className="footer-heading">HELP CENTER</h5>
            <ul className="list-unstyled footer-links">
              <li><a href="#" className="footer-link">Help Center</a></li>
              <li><a href="#" className="footer-link">Contact Us</a></li>
              <li><a href="#" className="footer-link">How to shop on Blitxpress</a></li>
              <li><a href="#" className="footer-link">How to pay on Blitxpress</a></li>
              <li><a href="#" className="footer-link">Shipping & Delivery</a></li>
              <li><a href="#" className="footer-link">Return Policy</a></li>
              <li><a href="#" className="footer-link">Report a problem</a></li>
            </ul>
          </Col>

          {/* Column 3: MAKE MONEY WITH BLITXPRESS */}
          <Col xs={6} md={3} lg={2} className="mb-3">
            <h5 className="footer-heading">MAKE MONEY WITH BLITXPRESS</h5>
            <ul className="list-unstyled footer-links">
              <li><a href="#" className="footer-link">Sell on Blitxpress</a></li>
              <li><a href="#" className="footer-link">Blitxpress Affiliates</a></li>
              <li><a href="#" className="footer-link">Blitxpress Logistics</a></li>
              <li><a href="#" className="footer-link">Blitxpress Prime</a></li>
              <li><a href="#" className="footer-link">Blitxpress Vouchers</a></li>
            </ul>
          </Col>

          {/* Column 4: More BLITXPRESS */}
          <Col xs={6} md={3} lg={2} className="mb-3">
            <h5 className="footer-heading">MORE BLITXPRESS</h5>
            <ul className="list-unstyled footer-links">
              <li><a href="#" className="footer-link">Blitxpress Food</a></li>
              <li><a href="#" className="footer-link">Blitxpress Travel</a></li>
              <li><a href="#" className="footer-link">Blitxpress Deals</a></li>
              <li><a href="#" className="footer-link">Blitxpress Services</a></li>
            </ul>
          </Col>

          {/* Column 5 & 6 (Combined for larger screens for app & social) */}
          <Col xs={12} lg={4} className="mb-3 d-flex flex-column align-items-lg-end"> {/* Right align on large screens */}
            <div className="footer-social-app-wrapper text-lg-end"> {/* Align text right on large screens */}
              {/* Social Media */}
              <h5 className="footer-heading mb-3">FOLLOW US</h5>
              <div className="footer-social-icons mb-4">
                <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
                <a href="#" className="social-icon"><i className="bi bi-twitter"></i></a>
                <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
                <a href="#" className="social-icon"><i className="bi bi-youtube"></i></a>
              </div>

              {/* App Download */}
              <h5 className="footer-heading mb-3">DOWNLOAD BLITXPRESS APP</h5>
              <div className="footer-app-badges">
                {/* Generic placeholder images for app badges */}
                <a href="#"><img src="https://logos-world.net/wp-content/uploads/2020/12/Google-Play-Logo.png" alt="Google Play" className="app-badge me-2"/></a>
                <a href="#"><img src="https://logos-world.net/wp-content/uploads/2021/02/App-Store-Logo.png" alt="App Store" className="app-badge"/></a>
              </div>
            </div>
          </Col>
        </Row>

        <hr className="footer-divider my-4" />

        {/* Section 3: Payment & Delivery Logos */}
        <Row className="footer-payment-delivery-row mb-4">
          <Col xs={12} md={6} className="mb-3">
            <h5 className="footer-heading mb-3">PAYMENT METHODS</h5>
            <div className="payment-delivery-icons">
              {/* Generic placeholder payment icons */}
              <img src="https://via.placeholder.com/60x40?text=Visa" alt="Visa" className="payment-icon"/>
              <img src="https://via.placeholder.com/60x40?text=MasterCard" alt="MasterCard" className="payment-icon"/>
              <img src="https://via.placeholder.com/60x40?text=MobileMoney" alt="Mobile Money" className="payment-icon"/>
              <img src="https://via.placeholder.com/60x40?text=PayPal" alt="PayPal" className="payment-icon"/>
              {/* Add more payment icons as needed */}
            </div>
          </Col>
          <Col xs={12} md={6} className="mb-3">
            <h5 className="footer-heading mb-3">DELIVERY PARTNERS</h5>
            <div className="payment-delivery-icons">
              {/* Generic placeholder delivery icons */}
              <img src="https://via.placeholder.com/80x40?text=BlitXpress+Logistics" alt="BlitXpress Logistics" className="payment-icon"/>
              <img src="https://via.placeholder.com/60x40?text=DHL" alt="DHL" className="payment-icon"/>
              {/* Add more delivery icons as needed */}
            </div>
          </Col>
        </Row>

        <hr className="footer-divider my-4" />

        {/* Section 4: Copyright & Legal */}
        <Row className="footer-copyright-row text-center text-md-start">
          <Col xs={12} md={6} className="mb-2">
            <p className="copyright-text mb-0">&copy; {new Date().getFullYear()} Blitxpress. All rights reserved.</p>
          </Col>
          <Col xs={12} md={6} className="text-md-end mb-2">
            <div className="legal-links">
              <a href="#" className="legal-link me-3">Privacy Policy</a>
              <a href="#" className="legal-link">Terms & Conditions</a>
            </div>
          </Col>
        </Row>

      </Container>
    </footer>
  );
};

export default Footer;