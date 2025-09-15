// src/app/pages/HomePage.tsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Alert } from "react-bootstrap";
import HeroSection from "../components/HomePage/HeroSection";
import DealsSection from "../components/HomePage/DealsSection";
import SuperBuyerSection from "../components/HomePage/SuperBuyerSection";
import TopProductsSection from "../components/HomePage/TopProductsSection";
import ToastService from "../services/ToastService";
import "./HomePage.css"; // Import the CSS file to ensure mobile gap fixes are applied
// Inline styles for HomePage following the unified design system
const homePageStyles = `
  .homepage-container {
    background: var(--background-body);
    min-height: 100vh;
  }

  .homepage-section {
    padding: 2rem 0;
  }

  .homepage-section:first-child {
    padding-top: 1rem;
  }

  .homepage-section:last-child {
    padding-bottom: 3rem;
  }

  .hero-section-fullwidth {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    padding: 0;
    margin-bottom: 3rem;
  }

  /* Mobile responsiveness fixes - remove gaps significantly */
  @media (max-width: 767.98px) {
    .homepage-container .container {
      margin-top: 0 !important; /* Override Bootstrap mt-4 */
      padding-top: 0 !important;
    }
    
    .homepage-section {
      padding: 0; /* Complete removal of section padding on mobile */
      margin: 0 !important; /* Force remove all margins */
    }
    
    .homepage-section:first-child {
      padding-top: 0;
      margin-top: 0 !important;
    }
    
    .homepage-section:last-child {
      padding-bottom: 1rem; /* Only add padding to last section */
      margin-bottom: 0 !important;
    }
    
    .hero-section-fullwidth {
      margin-bottom: 0; /* Remove all margin after hero section */
    }
    
    /* Force remove gaps between hero and deals - more aggressive */
    .homepage-section:nth-child(1),
    .homepage-section:first-of-type {
      margin-bottom: 0 !important;
      padding-bottom: 0 !important;
    }
    
    .homepage-section:nth-child(2),
    .homepage-section:nth-of-type(2) {
      margin-top: 0 !important;
      padding-top: 0 !important;
    }
    
    /* Target specific sections by component */
    .hero-section {
      margin-bottom: 0 !important;
      padding-bottom: 0 !important;
    }
    
    .deals-section-wrapper {
      margin-top: 0 !important;
      padding-top: 0 !important;
    }
  }

  @media (max-width: 575.98px) {
    .homepage-section {
      padding: 0; /* Ensure no padding on small mobile */
    }
    
    .homepage-section:first-child {
      padding-top: 0;
    }
    
    .hero-section-fullwidth {
      margin-bottom: 0;
    }
  }
`;

interface LocationState {
  orderSuccess?: boolean;
  orderId?: number;
  paymentUrl?: string;
}

const HomePage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  useEffect(() => {
    // Show order success message when user returns from checkout
    if (state?.orderSuccess && state?.orderId) {
      ToastService.success(
        `🎉 Order #${state.orderId} placed successfully! Thank you for your purchase.`,
        { autoClose: 6000 }
      );
      
      // Clear the state to prevent showing message on refresh
      window.history.replaceState({}, document.title);
    }
  }, [state]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: homePageStyles }} />
      <div className="homepage-container">
        <div className="container mt-4">
          {/* Order Success Alert */}
          {state?.orderSuccess && state?.orderId && (
            <Alert variant="success" className="mb-4">
              <Alert.Heading>🎉 Order Placed Successfully!</Alert.Heading>
              <p>
                Your order <strong>#{state.orderId}</strong> has been confirmed and is being processed.
                You will receive a confirmation email shortly.
              </p>
              <hr />
              <div className="d-flex justify-content-between">
                <a href="/account/orders" className="btn btn-outline-success">
                  <i className="bi bi-list-ul me-2"></i>
                  View My Orders
                </a>
                {state.paymentUrl && (
                  <a href={`/payment/${state.orderId}`} className="btn btn-success">
                    <i className="bi bi-credit-card me-2"></i>
                    Complete Payment
                  </a>
                )}
              </div>
            </Alert>
          )}

          <HeroSection />
          <DealsSection />
          <SuperBuyerSection />
          <TopProductsSection />
        </div>
      </div>
    </>
  );
};

export default HomePage;
