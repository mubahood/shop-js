// src/app/components/Header/TopUtilityBar.tsx
import React from 'react';

const TopUtilityBar: React.FC = () => {
  return (
    // Outer div for full-width background, hidden on mobile
    <div className="top-utility-bar-wrapper d-none d-lg-block">
      {/* Inner div to constrain content */}
      <div className="container d-flex justify-content-end align-items-center py-1">
        <a href="#" className="utility-link">Sell on Blitxpress</a>
        <a href="#" className="utility-link">Buyer Protection</a>
        <a href="#" className="utility-link">Help</a>
        <a href="#" className="utility-link"><i className="bi bi-phone me-1"></i>App</a>
      </div>
    </div>
  );
};

export default TopUtilityBar;