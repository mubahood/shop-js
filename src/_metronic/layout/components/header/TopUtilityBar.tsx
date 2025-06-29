import React from 'react';
import { Link } from 'react-router-dom';
import './TopUtilityBar.scss';

const TopUtilityBar: React.FC = () => {
  return (
    <div className="top-utility-bar d-none d-lg-flex justify-content-end align-items-center px-3 py-1 bg-light">
      <select className="me-3 form-select form-select-sm" aria-label="Language selector">
        <option value="en">English</option>
        <option value="es">Español</option>
        {/* …other languages */}
      </select>
      <select className="me-4 form-select form-select-sm" aria-label="Currency selector">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        {/* …other currencies */}
      </select>
      <nav className="quick-links">
        <Link to="/login"         className="me-3 text-dark">Sign In</Link>
        <Link to="/register"      className="me-3 text-dark">Join</Link>
        <Link to="/orders"        className="me-3 text-dark">My Orders</Link>
        <Link to="/messages"      className="me-3 text-dark">Messages</Link>
        <Link to="/help"          className="me-3 text-dark">Customer Service</Link>
        <Link to="/seller"        className="text-dark">Seller Center</Link>
      </nav>
    </div>
  );
};

export default TopUtilityBar;