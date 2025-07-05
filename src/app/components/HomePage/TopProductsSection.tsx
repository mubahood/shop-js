// src/app/components/HomePage/TopProductsSection.tsx
import React from "react";
import { Container, Button } from "react-bootstrap";
import ProductCard2 from "../shared/ProductCard2";
import { topProductsData } from "../../data/optimized/products";
import "./TopProductsSection.css"; // Dedicated CSS for this section

const TopProductsSection: React.FC = () => {
  return (
    // This section wrapper acts as the visual container for the whole section
    <section className="top-products-section-wrapper my-0 px-0 pt-0 pt-md-4">
      {" "}
      {/* Generous vertical margin to separate sections */}
      <Container className="px-4 ">
        {" "}
        {/* Bootstrap Container inside for max-width and horizontal padding */}
        <div className="top-products-header mb-1">
          <h2 className="top-products-title text-color-dark">
            Top 24 Products
          </h2>
          <a
            href="#"
            className="view-all-top-products-link text-primary fw-600"
          >
            View More <i className="bi bi-arrow-right ms-2"></i>
          </a>
        </div>
        <div className="top-products-grid">
          {topProductsData.map((product) => (
            <ProductCard2 key={product.id} product={product} />
          ))}
        </div>
        {/* Optional: Load More button or pagination */}
        <div className="text-center mt-5">
          <Button variant="outline-primary" className="btn-lg">
            Load More Products
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default TopProductsSection;
