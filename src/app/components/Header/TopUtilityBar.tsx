// src/app/components/Header/TopUtilityBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const TopUtilityBar: React.FC = () => (
  <div className="top-utility-bar">
    <select className="form-select form-select-sm" aria-label="Language selector">
      <option value="en">English</option>
      <option value="es">Español</option>
      {/* …other languages */}
    </select>
    <select className="form-select form-select-sm" aria-label="Currency selector">
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      {/* …other currencies */}
    </select>
    <nav className="quick-links">
      <Link to="/login">Sign In</Link>
      <Link to="/register">Join</Link>
      <Link to="/orders">My Orders</Link>
      <Link to="/messages">Messages</Link>
      <Link to="/help">Customer Service</Link>
      <Link to="/seller">Seller Center</Link>
    </nav>
  </div>
);

export default TopUtilityBar;