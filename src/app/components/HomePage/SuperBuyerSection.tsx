// src/app/components/HomePage/SuperBuyerSection.tsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import SuperBuyerFeatureCard from "./SuperBuyerFeatureCard";
import { ApiService } from "../../services/ApiService";
import ProductModel from "../../models/ProductModel";
import "./SuperBuyerSection.css"; // New CSS file for this section

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

const SuperBuyerSection: React.FC = () => {
  const [superBuyerCards, setSuperBuyerCards] = useState<SuperBuyerCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSuperBuyerData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch different types of products using the same method as ApiTestPage
        const [bulkProducts, fastDeliveryProducts, popularProducts] = await Promise.allSettled([
          ApiService.getProducts({ page: 1, limit: 2, sort_by: 'price_1', sort_order: 'asc' }),
          ApiService.getProducts({ page: 1, limit: 2, sort_by: 'date_added', sort_order: 'desc' }),
          ApiService.getProducts({ page: 1, limit: 2, sort_by: 'metric', sort_order: 'desc' }),
        ]);

        const cards: SuperBuyerCardData[] = [];

        // Bulk Saver Hub
        if (bulkProducts.status === 'fulfilled' && bulkProducts.value.data.length > 0) {
          cards.push({
            id: 1,
            title: "Bulk Saver Hub",
            products: bulkProducts.value.data.slice(0, 2).map(product => ({
              id: product.id,
              image: product.getMainImage(),
              price_new: product.getFormattedPrice(),
              price_old: product.getFormattedPrice2() !== product.getFormattedPrice() ? product.getFormattedPrice2() : undefined,
              badge: "Bulk deals"
            }))
          });
        }

        // Fast Delivery
        if (fastDeliveryProducts.status === 'fulfilled' && fastDeliveryProducts.value.data.length > 0) {
          cards.push({
            id: 2,
            title: "Fast delivery",
            products: fastDeliveryProducts.value.data.slice(0, 2).map(product => ({
              id: product.id,
              image: product.getMainImage(),
              price_new: product.getFormattedPrice(),
              price_old: product.getFormattedPrice2() !== product.getFormattedPrice() ? product.getFormattedPrice2() : undefined,
              badge: "Ships in 2 days"
            }))
          });
        }

        // Popular Picks
        if (popularProducts.status === 'fulfilled' && popularProducts.value.data.length > 0) {
          cards.push({
            id: 3,
            title: "Buy again",
            products: popularProducts.value.data.slice(0, 2).map(product => ({
              id: product.id,
              image: product.getMainImage(),
              price_new: product.getFormattedPrice(),
              price_old: product.getFormattedPrice2() !== product.getFormattedPrice() ? product.getFormattedPrice2() : undefined,
              badge: "Popular picks"
            }))
          });
        }

        setSuperBuyerCards(cards);
      } catch (error) {
        console.error('Failed to load SuperBuyer data:', error);
        // Set empty cards if API fails
        setSuperBuyerCards([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadSuperBuyerData();
  }, []);
  return (
    // The main wrapper that will have the background image
    // Note: my-4 adds top/bottom margin, if you want full width to edges, remove 'my-4' and add padding to wrapper
    <section className="superbuyer-section-wrapper mt-4 mb-4">
      {/* Primary overlay for the entire section for text readability */}
      <div className="superbuyer-background-overlay"></div>

      {/* Content within Bootstrap Container for horizontal alignment */}
      <Container className="superbuyer-content-container">
        {/* Top Banner Content Area */}
        <div className="superbuyer-banner-content-area">
          {/* Left Content Block */}
          <div className="superbuyer-banner-left">
            <h1 className="superbuyer-title mb-0">SuperBuyer</h1>
            {/* Added Tax exemptions back, assuming it was removed accidentally */}
            <div className="superbuyer-features mt-4"> {/* Increased top margin for features */}
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
            <Button variant="light" className="superbuyer-shop-now-btn mt-5"> {/* Increased top margin for button */}
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
        <Row className="superbuyer-feature-cards-grid gx-3">
          {isLoading ? (
            // Loading skeleton
            [1, 2, 3].map((i) => (
              <Col key={i} xs={12} md={4} className="mb-3 mb-md-0">
                <div className="placeholder-glow">
                  <div className="placeholder w-100" style={{ height: '200px' }}></div>
                </div>
              </Col>
            ))
          ) : superBuyerCards.length > 0 ? (
            // Real API data
            superBuyerCards.map((card) => (
              <Col key={card.id} xs={12} md={4} className="mb-3 mb-md-0">
                <SuperBuyerFeatureCard card={card} />
              </Col>
            ))
          ) : (
            // No data fallback
            <Col xs={12}>
              <div className="text-center py-4">
                <p className="text-muted">No featured products available at the moment.</p>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default SuperBuyerSection;