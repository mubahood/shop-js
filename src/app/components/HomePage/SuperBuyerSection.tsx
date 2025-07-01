// src/app/components/HomePage/SuperBuyerSection.tsx
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import SuperBuyerFeatureCard from "./SuperBuyerFeatureCard";
import { dummySuperBuyerCards } from "../../data/dummySuperBuyerData";
import "./SuperBuyerSection.css"; // New CSS file for this section

const SuperBuyerSection: React.FC = () => {
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
        <Row className="superbuyer-feature-cards-grid gx-3"> {/* Removed mt-0 mt-lg-0 as vertical spacing will be managed by banner-content-area padding-bottom */}
          {dummySuperBuyerCards.map((card) => (
            <Col key={card.id} xs={12} md={4} className="mb-3 mb-md-0">
              <SuperBuyerFeatureCard card={card} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default SuperBuyerSection;