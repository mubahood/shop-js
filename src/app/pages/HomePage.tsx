// src/app/pages/HomePage.tsx
import React from "react";

// Components
import HeroSection from "../components/HomePage/HeroSection";
import DealsSection from "../components/HomePage/DealsSection";
import SuperBuyerSection from "../components/HomePage/SuperBuyerSection";
import TopProductsSection from "../components/HomePage/TopProductsSection";

const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
      <div className="container">
        <section className="homepage-section">
          <HeroSection />
        </section>
        
        <section className="homepage-section">
          <DealsSection />
        </section>
        
        <section className="homepage-section">
          <SuperBuyerSection />
        </section>
        
        <section className="homepage-section">
          <TopProductsSection />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
