// src/app/pages/HomePage.tsx
import React from "react";
import HeroSection from "../components/HomePage/HeroSection";
import DealsSection from "../components/HomePage/DealsSection"; // Import it
import SuperBuyerSection from "../components/HomePage/SuperBuyerSection";
import "../components/HomePage/SuperBuyerSection.css"; // NEW: For the SuperBuyer section
import TopProductsSection from "../components/HomePage/TopProductsSection";

const HomePage: React.FC = () => {
  return (
    // The container is now applied directly here for all content
    <div className="container mt-4">
      <HeroSection />
      <DealsSection /> {/* Add it here */}
      <SuperBuyerSection />
      <TopProductsSection />
    </div>
  );
};

export default HomePage;
