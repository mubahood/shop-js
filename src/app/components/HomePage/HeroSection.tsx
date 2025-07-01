// src/app/components/HomePage/HeroSection.tsx
import React from "react";
import CategoryList from "./CategoryList";
import HeroCarousel from "./HeroCarousel";
import "./HeroSection.css"; // Import our new styles

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="row g-3">
        {/* Left Column for Categories */}
        <div className="col-lg-3 d-none d-lg-block">
          <CategoryList />
        </div>

        {/* Right Column for Carousel */}
        <div className="col-lg-9">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
