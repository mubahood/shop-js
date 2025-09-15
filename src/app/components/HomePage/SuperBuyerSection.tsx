// src/app/components/HomePage/SuperBuyerSection.tsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import SuperBuyerFeatureCard from "./SuperBuyerFeatureCard";
import { useGetProductsQuery } from "../../services/realProductsApi";
import ProductModel from "../../models/ProductModel";
import { getProductImage } from "../../utils";

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

// Inline styles for SuperBuyerSection following the unified design system
const superBuyerStyles = `
  .superbuyer-section-wrapper {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-dark) 100%);
    border-radius: var(--border-radius);
    margin: 2rem 0;
    padding: 2rem 0;
    position: relative;
    overflow: hidden;
    background-image: url("https://ae-pic-a1.aliexpress-media.com/kf/Sd4b8b26b77d94bd891e89a8665e4b5e47/2424x917.png");
    background-size: cover;
    background-position: center;
  }

  .superbuyer-background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    z-index: 1;
  }

  .superbuyer-content-container {
    position: relative;
    z-index: 2;
  }

  .superbuyer-banner-content-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .superbuyer-banner-left {
    flex: 1;
    min-width: 300px;
  }

  .superbuyer-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 1rem;
  }

  .superbuyer-features {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }

  .superbuyer-features span {
    color: var(--white);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    opacity: 0.9;
  }

  .superbuyer-shop-now-btn {
    background: var(--white) !important;
    color: var(--primary-color) !important;
    border: none !important;
    padding: 0.75rem 2rem !important;
    font-weight: 600 !important;
    border-radius: var(--border-radius) !important;
  }

  .superbuyer-shop-now-btn:hover {
    background: var(--background-light) !important;
    color: var(--primary-color) !important;
  }

  .superbuyer-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    flex: 1;
    min-width: 300px;
  }

  .superbuyer-stat-item {
    text-align: center;
    color: var(--white);
  }

  .superbuyer-stat-number {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--white);
  }

  .superbuyer-stat-text {
    font-size: 0.85rem;
    opacity: 0.9;
    margin-bottom: 0;
  }

  .superbuyer-stat-icon {
    font-size: 1.5rem;
    margin-top: 0.5rem;
    opacity: 0.7;
  }

  .superbuyer-feature-cards-grid {
    margin-top: 2rem;
  }

  /* Loading overlay styles */
  .superbuyer-loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(243, 61, 2, 0.9);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
  }

  .superbuyer-loading-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid white;
    border-radius: 50%;
    animation: superbuyer-spin 1s linear infinite;
  }

  @keyframes superbuyer-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .superbuyer-loading-text {
    color: white;
    font-size: 1.1rem;
    font-weight: 500;
    text-align: center;
  }

  .superbuyer-section-skeleton {
    opacity: 0.6;
  }

  .superbuyer-skeleton-pulse {
    animation: superbuyer-pulse 1.5s ease-in-out infinite alternate;
  }

  @keyframes superbuyer-pulse {
    from { opacity: 0.6; }
    to { opacity: 1; }
  }

  /* SuperBuyerFeatureCard styles */
  .superbuyer-feature-card {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    height: 100%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }

  .superbuyer-feature-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .superbuyer-card-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-color-dark);
    margin-bottom: 1rem;
    text-align: center;
  }

  .superbuyer-mini-products {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .superbuyer-mini-product-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: inherit;
    padding: 0.75rem;
    border-radius: var(--border-radius);
    transition: background-color 0.2s ease;
  }

  .superbuyer-mini-product-item:hover {
    background-color: var(--background-light);
    color: inherit;
    text-decoration: none;
  }

  .mini-product-image-wrapper {
    width: 60px;
    height: 60px;
    border-radius: var(--border-radius);
    overflow: hidden;
    flex-shrink: 0;
  }

  .mini-product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .mini-product-pricing {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .mini-product-price-new {
    font-weight: 600;
    color: var(--primary-color);
    font-size: 0.9rem;
  }

  .mini-product-price-old {
    font-size: 0.8rem;
    color: var(--text-color-muted);
    text-decoration: line-through;
  }

  .mini-product-badge {
    font-size: 0.75rem;
    color: white;
    font-weight: 500;
    background: var(--accent-color);
    padding: 0.25rem 0.5rem;
    border-radius: var(--border-radius);
    white-space: nowrap;
  }

  /* Hide on mobile devices */
  @media (max-width: 767.98px) {
    .superbuyer-section-wrapper {
      display: none;
    }
  }

  @media (max-width: 991.98px) {
    .superbuyer-banner-content-area {
      flex-direction: column;
      text-align: center;
    }
    
    .superbuyer-title {
      font-size: 2rem;
    }
    
    .superbuyer-stats {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const SuperBuyerSection: React.FC = () => {
  const [superBuyerCards, setSuperBuyerCards] = useState<SuperBuyerCardData[]>([]);
  const [isDataReady, setIsDataReady] = useState(false);
  
  // Fetch products for SuperBuyer section
  const { data: productsResponse, isLoading, error } = useGetProductsQuery({
    page: 1,
    limit: 6,
    sort_by: 'created_at',
    sort_order: 'desc'
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
      <style dangerouslySetInnerHTML={{ __html: superBuyerStyles }} />
      <section className="superbuyer-section-wrapper mt-4 mb-4">
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
              <Button variant="light" className="superbuyer-shop-now-btn mt-5" disabled={isLoading || !isDataReady}>
                Shop now
              </Button>
            </div>

            {/* Right Stats Block */}
            <div className="superbuyer-stats">
              <div className="superbuyer-stat-item">
                <h2 className="superbuyer-stat-number">5M+</h2>
                <p className="superbuyer-stat-text">Factory direct supply</p>
                <i className="bi bi-building superbuyer-stat-icon"></i>
              </div>
              <div className="superbuyer-stat-item">
                <h2 className="superbuyer-stat-number">20M+</h2>
                <p className="superbuyer-stat-text">Value dropshipping items</p>
                <i className="bi bi-box-seam superbuyer-stat-icon"></i>
              </div>
              <div className="superbuyer-stat-item">
                <h2 className="superbuyer-stat-number">10</h2>
                <p className="superbuyer-stat-text">Local warehouses worldwide</p>
                <i className="bi bi-globe superbuyer-stat-icon"></i>
              </div>
              <div className="superbuyer-stat-item">
                <h2 className="superbuyer-stat-number">24H</h2>
                <p className="superbuyer-stat-text">
                  Personalized sourcing service
                </p>
                <i className="bi bi-clock-history superbuyer-stat-icon"></i>
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