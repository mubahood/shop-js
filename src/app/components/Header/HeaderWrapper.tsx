// src/app/components/Header/HeaderWrapper.tsx
import React from 'react';
import TopUtilityBar from './TopUtilityBar';
import MainNav from './MainNav';
import MobileSearchBar from './MobileSearchBar'; // Import the new component
import './Header.css';

const HeaderWrapper: React.FC = () => {
  return (
    <header className="fixed-top header-wrapper">
      <TopUtilityBar />
      <MainNav />
      <MobileSearchBar /> {/* Add it right after the MainNav */}
    </header>
  );
};

export default HeaderWrapper;