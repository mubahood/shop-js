// src/app/components/Header/SimpleNavbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../store/slices/authSlice';
import { useCart } from '../../hooks/useCart';
import { useAppCounts } from '../../hooks/useManifest';
import './SimpleNavbar.css';

const SimpleNavbar: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { cartCount } = useCart();
  const appCounts = useAppCounts();
  const wishlistCount = appCounts.wishlist_count;

  return (
    <nav className="simple-navbar">
      <div className="simple-navbar-container">
        {/* Left Section - Logo */}
        <Link to="/" className="simple-navbar-logo">
          <img
            src="/media/logos/logo-1.png"
            alt="Blitxpress"
            className="simple-navbar-logo-img"
          />
        </Link>

        {/* Center Section - Help & Seller Links */}
        <div className="simple-navbar-center">
          <Link to="/help" className="simple-navbar-link">Help Centre</Link>
          <span className="simple-navbar-separator">|</span>
          <Link to="/sell" className="simple-navbar-link">Sell on BlitXpress</Link>
        </div>

        {/* Right Section - User Links & Icons */}
        <div className="simple-navbar-right">
          {isAuthenticated ? (
            <>
              <Link to="/account/orders" className="simple-navbar-link">Orders</Link>
              <span className="simple-navbar-separator">|</span>
              <Link to="/account" className="simple-navbar-link">My Account</Link>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="simple-navbar-link">Login</Link>
              <span className="simple-navbar-separator">|</span>
              <Link to="/auth/register" className="simple-navbar-link">Register</Link>
            </>
          )}
          
          {/* Orange Wishlist Button */}
          <Link to={isAuthenticated ? "/account/wishlist" : "/auth/login"} className="simple-navbar-wishlist-btn">
            <i className="bi bi-heart-fill"></i>
          </Link>

          {/* Orange Cart Button */}
          <Link to="/cart" className="simple-navbar-cart-btn">
            <i className="bi bi-cart3"></i>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNavbar;

