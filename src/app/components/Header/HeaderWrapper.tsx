// src/app/components/Header/HeaderWrapper.tsx
import React from 'react';
import SimpleNavbar from './SimpleNavbar';
import MobileNavbarRedesign from './MobileNavbarRedesign';
import './Header.css';

const HeaderWrapper: React.FC = () => {
  return (
    <header className="fixed-top header-wrapper">
      {/* Desktop Navbar - Hidden on mobile */}
      <div className="d-none d-lg-block">
        <SimpleNavbar />
      </div>
      {/* Mobile Navbar - Only visible on mobile */}
      <MobileNavbarRedesign />
    </header>
  );
};

export default HeaderWrapper;