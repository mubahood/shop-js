// src/app/components/HomePage/DealsSection.tsx
import React, { useRef } from "react"; // Import useRef
import Countdown from "./Countdown";
import ProductCard from "../shared/ProductCard";
import { dummyDeals } from "../../data/dummyProducts";
import "./DealsSection.css";

const DealsSection: React.FC = () => {
  // Set the target date for the countdown to 24 hours from now
  const targetDate = new Date();
  targetDate.setHours(targetDate.getHours() + 24);

  // Create a ref for the deals container
  const dealsContainerRef = useRef<HTMLDivElement>(null);

  // Function to scroll left
  const scrollLeft = () => {
    if (dealsContainerRef.current) {
      // Scroll by the width of one card plus the gap (approx 180px + 16px)
      // Or scroll by a percentage of the container width
      dealsContainerRef.current.scrollBy({
        left: -200, // Adjust this value as needed based on card width + gap
        behavior: "smooth", // Smooth scroll animation
      });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (dealsContainerRef.current) {
      dealsContainerRef.current.scrollBy({
        left: 200, // Adjust this value as needed based on card width + gap
        behavior: "smooth", // Smooth scroll animation
      });
    }
  };

  return (
    <section className="deals-section-wrapper">
      <div className="deals-header">
        <div className="deals-title">
          <i className="bi bi-lightning-charge-fill"></i>
          <h2>Flash Deals</h2>
        </div>

        {/* The Live Countdown Component */}
        <Countdown targetDate={targetDate} />

        <a href="#" className="view-all-link">
          View All &rarr;
        </a>
      </div>

      {/* New: Add navigation controls */}
      <div className="deals-carousel-controls">
        <button className="carousel-control-btn prev" onClick={scrollLeft}>
          <i className="bi bi-chevron-left"></i>
        </button>

        {/* The Horizontally Scrolling Product Cards */}
        <div className="deals-container" ref={dealsContainerRef}> {/* Attach ref here */}
          {dummyDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <button className="carousel-control-btn next" onClick={scrollRight}>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </section>
  );
};

export default DealsSection;