// src/app/components/Layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO, SOCIAL_MEDIA, APP_LINKS, APP_NAME } from '../../constants';

const Footer: React.FC = () => {
  return (
    <footer className="modern-footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-columns">
            {/* Company Information */}
            <div className="footer-column">
              {/* Brand logo */}
              <div className="footer-logo-wrapper">
                <img
                  src="/media/logos/logo-1.png"
                  alt={APP_NAME}
                  className="footer-logo"
                />
              </div>
              <p className="footer-description">
                Modern electronics distributor built on the commitment to make quality technology
                accessible, affordable, and reliable for everyone. Shop with confidence and
                convenience.
              </p>
              <div className="footer-contact">
                <div className="contact-item">
                  <i className="bi bi-envelope"></i>
                  <a href={`mailto:${COMPANY_INFO.EMAIL}`}>{COMPANY_INFO.EMAIL}</a>
                </div>
                <div className="contact-item">
                  <i className="bi bi-telephone"></i>
                  <a href={`tel:${COMPANY_INFO.PHONE}`}>{COMPANY_INFO.PHONE}</a>
                </div>
                <div className="contact-item">
                  <i className="bi bi-whatsapp"></i>
                  <a href={`https://wa.me/${COMPANY_INFO.WHATSAPP.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                    {COMPANY_INFO.WHATSAPP}
                  </a>
                </div>
              </div>

              {/* Download apps section (large store badges) */}
              <div className="footer-apps-inline">
                <h4 className="footer-heading-download">Download Our Apps</h4>
                <div className="footer-store-badges">
                  <a
                    href={APP_LINKS.ANDROID}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="store-badge store-badge-google"
                  >
                    <img src="/media/bans/playstore.png" alt="Google Play" className="store-badge-icon" />
                    <span className="store-badge-text">
                      <span className="store-badge-small">GET IT ON</span>
                      <span className="store-badge-large">Google Play</span>
                    </span>
                  </a>
                  <a
                    href={APP_LINKS.IOS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="store-badge store-badge-apple"
                  >
                    <i className="bi bi-apple store-badge-icon" />
                    <span className="store-badge-text">
                      <span className="store-badge-small">Download on the</span>
                      <span className="store-badge-large">App Store</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/" className="footer-link">Home</Link></li>
                <li><Link to="/products" className="footer-link">All Products</Link></li>
                <li><Link to="/about" className="footer-link">About Us</Link></li>
                <li><Link to="/contact" className="footer-link">Contact</Link></li>
                <li><Link to="/help" className="footer-link">Help & Support</Link></li>
                <li><Link to="/buyer-protection" className="footer-link">Buyer Protection</Link></li>
              </ul>
            </div>

            {/* Account & Services */}
            <div className="footer-column">
              <h4 className="footer-heading">Account & Services</h4>
              <ul className="footer-links">
                <li><Link to="/account" className="footer-link">My Account</Link></li>
                <li><Link to="/account/orders" className="footer-link">Order History</Link></li>
                <li><Link to="/account/wishlist" className="footer-link">Wishlist</Link></li>
                <li><Link to="/register" className="footer-link">Create Account</Link></li>
                <li><Link to="/sell" className="footer-link">Sell on BlitXpress</Link></li>
                <li><Link to="/mobile-apps" className="footer-link">Mobile Apps</Link></li>
              </ul>
            </div>

            {/* Legal & Policies */}
            <div className="footer-column">
              <h4 className="footer-heading">Legal & Policies</h4>
              <ul className="footer-links">
                <li><Link to="/terms" className="footer-link">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
                <li><Link to="/buyer-protection" className="footer-link">Return Policy</Link></li>
                <li><Link to="/help" className="footer-link">Shipping Info</Link></li>
                <li><Link to="/help" className="footer-link">Payment Methods</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Section - aligned with screenshot */}
        <div className="footer-secondary">
          <div className="footer-social-row">
            <p className="footer-social-text">
              Follow Us for for More Deals on Social Media
            </p>
            <div className="social-links-compact">
              <a
                href={SOCIAL_MEDIA.FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-compact"
              >
                <img src="/media/bans/facebook.svg" alt="Facebook" className="social-icon-img" />
              </a>
              <a
                href={SOCIAL_MEDIA.INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-compact"
              >
                <img src="/media/bans/instagram.svg" alt="Instagram" className="social-icon-img" />
              </a>
              <a
                href={SOCIAL_MEDIA.TWITTER}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-compact"
              >
                <img src="/media/bans/x-twitter.svg" alt="X (Twitter)" className="social-icon-img" />
              </a>
              <a
                href={SOCIAL_MEDIA.TIKTOK}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-compact"
              >
                <img src="/media/bans/tiktok.svg" alt="TikTok" className="social-icon-img" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.NAME}. All rights reserved.</p>
            </div>
            <div className="footer-bottom-links">
              <Link to="/terms" className="footer-bottom-link">Terms</Link>
              <Link to="/privacy" className="footer-bottom-link">Privacy</Link>
              <Link to="/help" className="footer-bottom-link">Support</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;