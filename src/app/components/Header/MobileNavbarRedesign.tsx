// src/app/components/Header/MobileNavbarRedesign.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../store/slices/authSlice';
import { useCart } from '../../hooks/useCart';
import './MobileNavbarRedesign.css';

const MobileNavbarRedesign: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Mobile Navbar - Only visible on mobile */}
      <nav className="mobile-nav-redesign d-lg-none">
        <div className="mobile-nav-redesign-container">
          {/* Hamburger Menu Icon - Left */}
          <button
            className="mobile-nav-redesign-menu-btn"
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
          </button>

          {/* Logo - Centered */}
          <Link to="/" className="mobile-nav-redesign-logo">
            <img
              src="/media/logos/logo-1.png"
              alt="BlitXpress"
              className="mobile-nav-redesign-logo-img"
            />
          </Link>

          {/* Right Icons */}
          <div className="mobile-nav-redesign-icons">
            {/* Search Icon */}
            <button
              className="mobile-nav-redesign-icon-btn"
              type="button"
              onClick={() => {
                // Toggle search or navigate to search
                navigate('/products');
              }}
              aria-label="Search"
            >
              <i className="bi bi-search"></i>
            </button>

            {/* Shopping Cart Icon */}
            <Link
              to="/cart"
              className="mobile-nav-redesign-icon-btn mobile-nav-redesign-cart-btn"
              aria-label="Shopping cart"
            >
              <i className="bi bi-cart3"></i>
              {cartCount > 0 && (
                <span className="mobile-nav-redesign-cart-badge">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-nav-redesign-overlay ${isMenuOpen ? 'mobile-nav-redesign-overlay-show' : ''}`}
        onClick={toggleMenu}
      ></div>

      {/* Mobile Menu Sidebar */}
      <div className={`mobile-nav-redesign-menu ${isMenuOpen ? 'mobile-nav-redesign-menu-open' : ''}`}>
        <div className="mobile-nav-redesign-menu-header">
          <h3>Menu</h3>
          <button
            className="mobile-nav-redesign-menu-close"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="mobile-nav-redesign-menu-body">
          <Link to="/" className="mobile-nav-redesign-menu-link" onClick={toggleMenu}>
            <i className="bi bi-house"></i>
            <span>Home</span>
          </Link>
          <Link to="/products" className="mobile-nav-redesign-menu-link" onClick={toggleMenu}>
            <i className="bi bi-shop"></i>
            <span>All Products</span>
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/account" className="mobile-nav-redesign-menu-link" onClick={toggleMenu}>
                <i className="bi bi-person"></i>
                <span>My Account</span>
              </Link>
              <Link to="/account/orders" className="mobile-nav-redesign-menu-link" onClick={toggleMenu}>
                <i className="bi bi-box-seam"></i>
                <span>My Orders</span>
              </Link>
              <Link to="/account/wishlist" className="mobile-nav-redesign-menu-link" onClick={toggleMenu}>
                <i className="bi bi-heart"></i>
                <span>Wishlist</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="mobile-nav-redesign-menu-link" onClick={toggleMenu}>
                <i className="bi bi-box-arrow-in-right"></i>
                <span>Login</span>
              </Link>
              <Link to="/auth/register" className="mobile-nav-redesign-menu-link" onClick={toggleMenu}>
                <i className="bi bi-person-plus"></i>
                <span>Register</span>
              </Link>
            </>
          )}
          <Link to="/help" className="mobile-nav-redesign-menu-link" onClick={toggleMenu}>
            <i className="bi bi-question-circle"></i>
            <span>Help Centre</span>
          </Link>
          <Link to="/sell" className="mobile-nav-redesign-menu-link" onClick={toggleMenu}>
            <i className="bi bi-bag-check"></i>
            <span>Sell on BlitXpress</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileNavbarRedesign;
