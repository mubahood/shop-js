// src/app/pages/HomePage.tsx
import React, { useEffect, useCallback, memo } from "react";
import { useLocation } from "react-router-dom";
import { Alert } from "react-bootstrap";
import HeroSection from "../components/HomePage/HeroSection";
import DealsSection from "../components/HomePage/DealsSection";
import SuperBuyerSection from "../components/HomePage/SuperBuyerSection";
import TopProductsSection from "../components/HomePage/TopProductsSection";
import ToastService from "../services/ToastService";
import { useLazyLoad } from "../hooks/useIntersectionObserver";
import { SEOHead } from "../components/seo";
import { generateHomePageMetaTags } from "../utils/seo";
import "./HomePage.css"; // Import the CSS file to ensure mobile gap fixes are applied
// Inline styles for HomePage following the unified design system
const homePageStyles = `
  .homepage-container {
    background: var(--background-body);
    min-height: 100vh;
    padding-top: 0.5rem;
  }

  .homepage-section {
    padding: 0.25rem 0;
  }

  .homepage-section:first-child {
    padding-top: 0;
  }

  .homepage-section:last-child {
    padding-bottom: 1rem;
  }

  .hero-section-fullwidth {
    width: 100%;
    max-width: 1160px;
    margin: 0 auto 0.25rem auto;
  }

  /* Ensure hero content stays within container */
  .hero-section-fullwidth .hero-section {
    width: 100%;
    max-width: 100%;
    margin: 0;
  }

  .homepage-container .container {
    max-width: 1200px;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
  }

  /* Mobile responsiveness fixes - reduce gaps and center content */
  @media (max-width: 767.98px) {
    .homepage-container {
      padding-top: 0.25rem;
    }
    
    .homepage-container .container {
      margin-top: 0 !important;
      padding-top: 0 !important;
      padding-left: 10px;
      padding-right: 10px;
    }
    
    .hero-section-fullwidth {
      margin: 0 auto 0.25rem auto;
      max-width: 100%;
      padding: 0;
    }
    
    .hero-section-fullwidth .hero-section {
      margin: 0;
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
      margin: 0 auto 0.25rem auto;
      width: 100%;
      max-width: 100%;
      padding: 0 5px;
    }
    
    .homepage-container .container {
      padding-left: 5px;
      padding-right: 5px;
    }
  }
`;

// Lazy loaded section components with performance optimization
const LazyDealsSection = memo(() => {
  const { isIntersecting, ref } = useLazyLoad(0.1, '200px');
  
  return (
    <div ref={ref} className="homepage-section">
      {isIntersecting ? <DealsSection /> : (
        <div style={{ height: '300px' }} className="d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading deals...</span>
          </div>
        </div>
      )}
    </div>
  );
});

const LazySuperBuyerSection = memo(() => {
  const { isIntersecting, ref } = useLazyLoad(0.1, '200px');
  
  return (
    <div ref={ref} className="homepage-section">
      {isIntersecting ? <SuperBuyerSection /> : (
        <div style={{ height: '400px' }} className="d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading super buyer deals...</span>
          </div>
        </div>
      )}
    </div>
  );
});

const LazyTopProductsSection = memo(() => {
  const { isIntersecting, ref } = useLazyLoad(0.1, '200px');
  
  return (
    <div ref={ref} className="homepage-section">
      {isIntersecting ? <TopProductsSection /> : (
        <div style={{ height: '400px' }} className="d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading top products...</span>
          </div>
        </div>
      )}
    </div>
  );
});

interface LocationState {
  orderSuccess?: boolean;
  orderId?: number;
  paymentUrl?: string;
}

const HomePage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  // Optimized success message handler with useCallback
  const handleOrderSuccess = useCallback(() => {
    if (state?.orderSuccess && state?.orderId) {
      ToastService.success(
        `🎉 Order #${state.orderId} placed successfully! Thank you for your purchase.`,
        { autoClose: 6000 }
      );
      
      // Clear the state to prevent showing message on refresh
      window.history.replaceState({}, document.title);
    }
  }, [state?.orderSuccess, state?.orderId]);

  // Optimized payment navigation handler with useCallback
  const handlePaymentNavigation = useCallback((orderId: number) => {
    window.location.href = `/payment/${orderId}`;
  }, []);

  // Optimized orders navigation handler with useCallback
  const handleOrdersNavigation = useCallback(() => {
    window.location.href = "/account/orders";
  }, []);

  useEffect(() => {
    handleOrderSuccess();
  }, [handleOrderSuccess]);

  return (
    <>
      <SEOHead config={generateHomePageMetaTags()} />
      <style dangerouslySetInnerHTML={{ __html: homePageStyles }} />
      <div className="homepage-container">
        <div className="container">
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
                <button 
                  onClick={handleOrdersNavigation}
                  className="btn btn-outline-success"
                  type="button"
                >
                  <i className="bi bi-list-ul me-2"></i>
                  View My Orders
                </button>
                {state.paymentUrl && (
                  <button 
                    onClick={() => handlePaymentNavigation(state.orderId!)}
                    className="btn btn-success"
                    type="button"
                  >
                    <i className="bi bi-credit-card me-2"></i>
                    Complete Payment
                  </button>
                )}
              </div>
            </Alert>
          )}

          {/* Hero Section - Always load immediately for LCP */}
          <div className="homepage-section hero-section-fullwidth">
            <HeroSection />
          </div>
          
          {/* Lazy loaded sections for improved performance */}
          <LazyDealsSection />
          <LazySuperBuyerSection />
          <LazyTopProductsSection />
        </div>
      </div>
    </>
  );
};

export default memo(HomePage);
