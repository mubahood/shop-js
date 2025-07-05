// src/app/components/Layout/AuthLayout.tsx
import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { APP_CONFIG } from "../../constants";
import "./AuthLayout.css";

const AuthLayout: React.FC = () => {
  useEffect(() => {
    // Add class to body and html to override main layout styles
    document.body.classList.add('auth-active');
    document.documentElement.classList.add('auth-active');
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('auth-active');
      document.documentElement.classList.remove('auth-active');
    };
  }, []);

  return (
    <div className="auth-layout">
      {/* Left Side - Branding Panel */}
      <div className="auth-branding-panel d-none d-lg-block">
        <div className="auth-branding-content">
          <Link to="/" className="text-white text-decoration-none">
            <img
              src="/media/logos/logo-white.png"
              alt={APP_CONFIG.NAME}
              className="auth-logo"
              onError={(e) => {
                // Fallback if logo doesn't exist
                e.currentTarget.style.display = 'none';
              }}
            />
          </Link>
          
          <h2>Welcome to {APP_CONFIG.NAME}</h2>
          <p className="lead">
            Your premier destination for quality products at unbeatable prices.
            Join thousands of satisfied customers worldwide!
          </p>
          
          {/* Enhanced Features */}
          <div className="auth-features">
            <div className="auth-feature-item">
              <i className="bi bi-shield-check"></i>
              <span>100% Secure Shopping Experience</span>
            </div>
            <div className="auth-feature-item">
              <i className="bi bi-truck"></i>
              <span>Fast & Free Worldwide Delivery</span>
            </div>
            <div className="auth-feature-item">
              <i className="bi bi-headset"></i>
              <span>24/7 Premium Customer Support</span>
            </div>
            <div className="auth-feature-item">
              <i className="bi bi-award"></i>
              <span>Best Price Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms Panel */}
      <div className="auth-form-panel">
        <div className="auth-form-container">
          {/* Mobile Logo */}
          <div className="auth-mobile-logo d-lg-none">
            <Link to="/">
              <img
                src="/media/logos/logo.png"
                alt={APP_CONFIG.NAME}
                onError={(e) => {
                  // Fallback if logo doesn't exist
                  e.currentTarget.style.display = 'none';
                }}
              />
            </Link>
          </div>
          
          {/* Auth Form Content */}
          <div className="auth-form-content">
            <Outlet />
          </div>
          
          {/* Back to Home Link */}
          <div className="auth-back-link">
            <Link to="/">
              <i className="bi bi-arrow-left"></i>
              Back to Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
