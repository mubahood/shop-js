// src/app/components/Header/HeaderWrapper.tsx
import React from 'react';
import TopUtilityBar from './TopUtilityBar';
import MainNav       from './MainNav';
import './Header.css';

const HeaderWrapper: React.FC = () => (
  <header>
    <TopUtilityBar />
    <MainNav />
  </header>
);

export default HeaderWrapper;