// src/app/components/Header/HeaderWrapper.tsx
import React from 'react';
import SimpleNavbar from './SimpleNavbar';
import './Header.css';

const HeaderWrapper: React.FC = () => {
  return (
    <header className="fixed-top header-wrapper">
      <SimpleNavbar />
    </header>
  );
};

export default HeaderWrapper;