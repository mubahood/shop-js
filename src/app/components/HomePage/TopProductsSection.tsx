// src/app/components/HomePage/TopProductsSection.tsx
import React, { useEffect, useState } from "react";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductCardSimple from "../shared/ProductCardSimple";
import ProductModel from "../../models/ProductModel";
import { useFeaturedProducts } from "../../hooks/useManifest";
import "./TopProductsSection.css"; // Dedicated CSS for this section

const TopProductsSection: React.FC = () => {
  const featuredProducts = useFeaturedProducts();
  const [isLoading, setIsLoading] = useState(false);

  // For now, use featured products from manifest as top products
  // In the future, we could add a separate top_products field to the manifest
  const products = featuredProducts.slice(0, 12); // Limit to 12 products
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
          <Link
            to="/products?sort_by=rating&sort_order=desc"
            className="view-all-top-products-link text-primary fw-600"
          >
            View More <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
        <div className="top-products-grid">
          {isLoading && (
            <div className="d-flex justify-content-center p-4">
              <Spinner animation="border" />
            </div>
          )}
          {!isLoading && products.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted">No top products available at the moment.</p>
            </div>
          )}
          {!isLoading && products.length > 0 && products.map((product) => (
            <ProductCardSimple key={product.id} product={product} />
          ))}
        </div>
        {/* Optional: Load More button or pagination */}
        {!isLoading && products.length > 0 && (
          <div className="text-center mt-5">
            <Link to="/products" className="btn btn-outline-primary btn-lg">
              View All Products
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
};

export default TopProductsSection;
