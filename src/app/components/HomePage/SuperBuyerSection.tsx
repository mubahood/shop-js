// src/app/components/HomePage/SuperBuyerSection.tsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SuperBuyerFeatureCard from "./SuperBuyerFeatureCard";
import { useGetProductsQuery } from "../../services/realProductsApi";
import ProductModel from "../../models/ProductModel";
import { getProductImage } from "../../utils";
import "./SuperBuyerSection.css";

// Interface for SuperBuyer card data
interface MiniProduct {
  id: number;
  image: string;
  price_new: string;
  price_old?: string;
  badge?: string;
}

export interface SuperBuyerCardData {
  id: number;
  title: string;
  products: MiniProduct[];
}

// SuperBuyer section with gradient background and white boxes pattern

const SuperBuyerSection: React.FC = () => {
  const [superBuyerCards, setSuperBuyerCards] = useState<SuperBuyerCardData[]>([]);
  const [isDataReady, setIsDataReady] = useState(false);
  
  // Fetch products for SuperBuyer section - only products with home_section_2 = 'Yes'
  const { data: productsResponse, isLoading, error } = useGetProductsQuery({
    page: 1,
    limit: 6,
    sort_by: 'created_at',
    sort_order: 'desc',
    home_section_2: 'Yes'  // Only fetch products marked for Super Buyer section
  });

  const products = productsResponse?.data || [];

  useEffect(() => {
    if (products.length > 0) {
      const cards: SuperBuyerCardData[] = [];

      // Create 3 cards with 2 products each
      for (let i = 0; i < 3 && i * 2 < products.length; i++) {
        const startIndex = i * 2;
        const cardProducts = products.slice(startIndex, startIndex + 2);
        
        const titles = ["Bulk Saver Hub", "Fast Delivery", "Popular Picks"];
        const badges = ["Bulk deals", "Ships in 2 days", "Popular picks"];
        
        cards.push({
          id: i + 1,
          title: titles[i],
          products: cardProducts.map((product: ProductModel) => ({
            id: product.id,
            image: getProductImage(product),
            price_new: `UGX ${parseInt(product.price_1 || '0').toLocaleString()}`,
            price_old: product.price_2 && product.price_2 !== product.price_1 ? `UGX ${parseInt(product.price_2).toLocaleString()}` : undefined,
            badge: badges[i]
          }))
        });
      }

      setSuperBuyerCards(cards);
      setIsDataReady(true);
    } else if (!isLoading && error) {
      // If there's an error or no products, still mark as ready to show fallback
      setIsDataReady(true);
    }
  }, [products, isLoading, error]);

  return (
    <>
      <section className="superbuyer-section-wrapper mb-4">
        {/* Primary overlay for the entire section for text readability */}
        <div className="superbuyer-background-overlay"></div>

        {/* Loading overlay - shows until data is ready */}
        {(isLoading || !isDataReady) && (
          <div className="superbuyer-loading-overlay">
            <div className="superbuyer-loading-spinner"></div>
            <div className="superbuyer-loading-text">
              Loading SuperBuyer deals...
            </div>
          </div>
        )}

        {/* Content within Bootstrap Container for horizontal alignment */}
        <Container className={`superbuyer-content-container ${(isLoading || !isDataReady) ? 'superbuyer-section-skeleton' : ''}`}>
          {/* Top Banner Content Area */}
          <div className={`superbuyer-banner-content-area ${(isLoading || !isDataReady) ? 'superbuyer-skeleton-pulse' : ''}`}>
            {/* Left Content Block */}
            <div className="superbuyer-banner-left">
              <h1 className="superbuyer-title mb-0">SuperBuyer</h1>
              <div className="superbuyer-features mt-4">
                <span>
                  <i className="bi bi-wallet-fill me-2"></i>Tax exemptions
                </span>
                <span>
                  <i className="bi bi-truck me-2"></i>Express payment
                </span>
                <span>
                  <i className="bi bi-currency-dollar me-2"></i>Financial support
                </span>
              </div>
              <Link to="/products" style={{ textDecoration: 'none' }}>
                <Button variant="danger" className="superbuyer-shop-now-btn mt-5" disabled={isLoading || !isDataReady}>
                  Shop now
                </Button>
              </Link>
            </div>

            {/* Right Stats Block */}
            <div className="superbuyer-stats">
              <div className="superbuyer-stat-item">
                <h2 className="superbuyer-stat-number">15K+</h2>
                <p className="superbuyer-stat-text">Happy customers in Uganda</p>
                <i className="bi bi-people superbuyer-stat-icon"></i>
              </div>
              <div className="superbuyer-stat-item">
                <h2 className="superbuyer-stat-number">2,500+</h2>
                <p className="superbuyer-stat-text">Electronics & gadgets</p>
                <i className="bi bi-phone superbuyer-stat-icon"></i>
              </div>
              <div className="superbuyer-stat-item">
                <h2 className="superbuyer-stat-number">48H</h2>
                <p className="superbuyer-stat-text">Delivery within Kampala</p>
                <i className="bi bi-truck superbuyer-stat-icon"></i>
              </div>
              <div className="superbuyer-stat-item">
                <h2 className="superbuyer-stat-number">6M</h2>
                <p className="superbuyer-stat-text">
                  Warranty on all products
                </p>
                <i className="bi bi-shield-check superbuyer-stat-icon"></i>
              </div>
            </div>
          </div>
          {/* Highlight Cards Section */}
          <Row className={`superbuyer-feature-cards-grid gx-3 ${(isLoading || !isDataReady) ? 'superbuyer-skeleton-pulse' : ''}`}>
            {!isDataReady ? (
              // Loading skeleton - always show during loading
              [1, 2, 3].map((i) => (
                <Col key={i} xs={12} md={4} className="mb-3 mb-md-0">
                  <div className="superbuyer-feature-card">
                    <div className="placeholder-glow">
                      <div className="placeholder w-75 mb-3" style={{ height: '20px' }}></div>
                      <div className="placeholder w-100 mb-2" style={{ height: '60px' }}></div>
                      <div className="placeholder w-100 mb-2" style={{ height: '60px' }}></div>
                    </div>
                  </div>
                </Col>
              ))
            ) : superBuyerCards.length > 0 ? (
              // Real API data - show only when data is ready
              superBuyerCards.map((card) => (
                <Col key={card.id} xs={12} md={4} className="mb-3 mb-md-0">
                  <SuperBuyerFeatureCard card={card} />
                </Col>
              ))
            ) : (
              // No data fallback - show only when data is ready but empty
              <Col xs={12}>
                <div className="superbuyer-feature-card text-center py-4">
                  <i className="bi bi-box-seam text-muted mb-3" style={{fontSize: '2rem'}}></i>
                  <p className="text-muted mb-0">No featured products available at the moment.</p>
                  <small className="text-muted">Check back later for new deals!</small>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default React.memo(SuperBuyerSection);