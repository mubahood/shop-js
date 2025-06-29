// src/app/components/Header/MainNav.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import ProductSearch from '../../pages/public/sections/LandingCategoriesSection'; 
// ← adjust this import to wherever your ProductSearch lives
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faShoppingCart,
  faHeart,
  faBell,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const MainNav: React.FC = () => (
  <div className="main-nav">
    {/* Left: Hamburger (mobile) + Logo */}
    <div className="d-flex align-items-center">
      <button className="btn btn-link d-lg-none me-3">
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>
      <Link to="/" className="logo">
        <img src="/media/logos/logo.png" alt="Logo" />
      </Link>
    </div>

    {/* Center: Search */}
    <div className="search-container">
      <ProductSearch />
    </div>

    {/* Right: Icons */}
    <div className="nav-icons">
      <Link to="/cart" className="position-relative">
        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
        <span className="badge">3</span>
      </Link>
      <Link to="/wishlist">
        <FontAwesomeIcon icon={faHeart} size="lg" />
      </Link>
      <Link to="/notifications" className="position-relative">
        <FontAwesomeIcon icon={faBell} size="lg" />
        <span className="badge">5</span>
      </Link>
      <Link to="/profile">
        <FontAwesomeIcon icon={faUser} size="lg" />
      </Link>
    </div>
  </div>
);

export default MainNav;